const { District, User, Translator } = require('../../data');
const { NotExistError, ConflictError, BadRequestError } = require('../../error');

module.exports = {
  get({ id }) {
    if (id !== undefined) {
      return District
        .findOne({
          where: { id },
          raw: true,
        })
        .then((district) => {
          if (!district) { throw new NotExistError('존재하지 않는 센터입니다.'); }
          return district;
        });
    }

    return District
      .findAll({
        where: { },
      });
  },

  add({ name, address, tel }) {
    console.log(name, address, tel);

    if (!name || !address || !tel) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return District
      .findOne({
        where: { name },
      })
      .then((district) => {
        if (district) { throw new ConflictError('이미 등록된 센터입니다.'); }

        return District
          .create({
            name,
            address,
            tel,
          });
      });
  },

  delete({ id }) {
    if (id === undefined) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return District
      .findOne({
        where: { id },
      })
      .then((district) => {
        if (!district) { throw new NotExistError('존재하지 않는 센터입니다.'); }

        return district.destroy();
      });
  },

  member({ id }) {
    if (id === undefined) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return User
      .findAll({
        where: { districtId: id },
      })
      .then(users => Translator
        .findAll({
          where: { districtId: id },
        })
        .then((translators) => {
          if (!users && !translators) { throw new NotExistError('소속된 유저와 통역사가 존재하지 않습니다.'); }

          return { users, translators };
        }));
  },

  modify({ id, name, address, tel }) {
    console.log(id, name, address, tel);

    if (id === undefined || (!name && !address && !tel)) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return District
      .findOne({
        where: { id },
      })
      .then((district) => {
        if (!district) { throw new NotExistError('존재하지 않은 센터id 입니다.'); }

        return district
          .update({
            name: (name || district.name),
            address: (address || district.address),
            tel: (tel || district.tel),
          });
      });
  },
};
