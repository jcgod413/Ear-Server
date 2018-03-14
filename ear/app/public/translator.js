const config = require('../../config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Translator, redis } = require('../../data');
const { NotExistError, ConflictError, BadRequestError, ForbiddenError } = require('../../error');
const { SMS } = require('../../util');

module.exports = {
  certificate({ mdn }) {
    return Translator
      .findOne({
        where: { mdn },
        raw: true,
      })
      .then((translator) => {
        if (translator) { throw new ConflictError('이미 등록된 회원입니다.'); }

        const certificateNum = Math.floor(Math.random() * 9000) + 1000;
        const contents = '안녕하세요 설리번입니다.\n인증번호는 ' + certificateNum + ' 입니다.';
        console.log(contents);

        return redis.publish(config.REDIS_HEADER_TRANSLATOR + mdn, certificateNum)
          .catch((e) => {
            throw e;
          })
          .then(() => {
            SMS.send(mdn, contents);
            return true;
          });
      });
  },

  verify({ mdn, certificateNum }) {
    console.log(mdn, certificateNum);
    
    return redis.subscribe(config.REDIS_HEADER_TRANSLATOR + mdn)
      .catch((e) => {
        throw e;
      })
      .then((savedNum) => {
        console.log(savedNum);
        if (savedNum === certificateNum) {
          return true;
        }
        throw new ForbiddenError('인증번호가 잘못되었거나 만료되었습니다.');
      });
  },

  login({ mdn, password }) {
    console.log(mdn, password);

    if (!mdn || !password) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    const encrypted = crypto.createHmac('sha1', config.JWT_TOKEN)
                            .update(password)
                            .digest('base64');
    console.log(encrypted);

    return Translator
      .findOne({
        where: { mdn, password: encrypted },
        raw: true,
      })
      .then((translator) => {
        if (!translator) { throw new NotExistError('일치하는 회원 정보가 없습니다.'); }
        console.log(translator);

        const value = { translatorId: translator.id };

        const p = new Promise((resolve, reject) => {
          jwt.sign(value, config.JWT_TOKEN, (err, encoded) => {
            if (err) {
              reject(err);
            }
            resolve(encoded);
          });
        });
        return p;
      });
  },

  signup({ name, mdn, password, gender, districtId }) {
    console.log(name, mdn, password, gender, districtId);

    if (!name || !mdn || !password || !gender || !districtId) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    const encrypted = crypto.createHmac('sha1', config.JWT_TOKEN)
                            .update(password)
                            .digest('base64');
    console.log(encrypted);

    return Translator
      .findOne({
        where: { mdn },
      })
      .then((translator) => {
        if (translator) { throw new ConflictError('이미 가입된 회원입니다.'); }

        return Translator
          .create({
            name,
            mdn,
            password: encrypted,
            gender,
            districtId,
          });
      });
  },
};
