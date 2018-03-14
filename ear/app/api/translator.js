const { Translator } = require('../../data');
const { NotExistError, BadRequestError } = require('../../error');

module.exports = {
  get({ id }, user) {
    const translatorId = id || user.translatorId;
    if (translatorId === undefined) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return Translator
    .findOne({
      where: { id: translatorId },
      raw: true,
    })
    .then((reply) => {
      if (!reply) { throw new NotExistError('존재하지 않는 통역사id 입니다.'); }
      return reply;
    });
  },

  getAll() {
    return Translator
    .findAll({
      raw: true,
    });
  },

  modify({ id, districtId, mdn, password, name, gender }, user) {
    const translatorId = id || user.translatorId;
    if (translatorId === undefined || (!districtId && !mdn && !password && !name && !gender)) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return Translator
      .findOne({
        where: { id: translatorId },
      })
      .then((translator) => {
        if (!translator) { throw new NotExistError('존재하지 않는 통역사id 입니다.'); }

        return translator
          .update({
            districtId: (districtId || translator.districtId),
            mdn: (mdn || translator.mdn),
            password: (password || translator.password),
            name: (name || translator.name),
            gender: (gender || translator.gender),
          });
      });
  },

  delete({ translator, id }, user) {
    const translatorId = id || user.translatorId;
    if (translatorId === undefined) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return Translator
      .findOne({
        where: { id: translatorId },
      })
      .then((reply) => {
        if (!translator) { throw new NotExistError('존재하지 않는 통역사id 입니다.'); }

        return reply.destroy();
      });
  },
};
