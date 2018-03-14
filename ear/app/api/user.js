const { User } = require('../../data');
const { NotExistError, BadRequestError } = require('../../error');

module.exports = {
  get({ id }, user) {
    const userId = id || user.id;
    if (userId === undefined) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return User
    .findOne({
      where: { id: userId },
      raw: true,
    })
    .then((reply) => {
      if (!reply) { throw new NotExistError('존재하지 않는 유저id 입니다.'); }
      return reply;
    });
  },

  getAll() {
    return User
    .findAll({
      raw: true,
    });
  },

  modify({ id, districtId, mdn, password, name, gender }, user) {
    const userId = id || user.id;
    if (userId === undefined || (!districtId && !mdn && !password && !name && !gender)) {
      throw new BadRequestError('요청 Parameter가 잘못되었습니다.');
    }

    return User
      .findOne({
        where: { id: userId },
      })
      .then((reply) => {
        if (!reply) { throw new NotExistError('존재하지 않는 유저id 입니다.'); }

        return reply
          .update({
            districtId: (districtId || user.districtId),
            mdn: (mdn || user.mdn),
            password: (password || user.password),
            name: (name || user.name),
            gender: (gender || user.gender),
          });
      });
  },

  delete({ id }, user) {
    const userId = id || user.id;
    if (userId === undefined) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return User
      .findOne({
        where: { id: userId },
      })
      .then((reply) => {
        if (!reply) { throw new NotExistError('존재하지 않는 유저id 입니다.'); }

        return reply.destroy();
      });
  },
};
