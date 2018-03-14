const userApi = require('./user');
const translatorApi = require('./translator');
const servicesApi = require('./services');
const { UnauthorizedError } = require('../../error');

module.exports = {
  getMe(bindParams, user) {
    if (user.id !== undefined) { // 유저인 경우
      return userApi.get(bindParams, user);
    } else if (user.translatorId !== undefined) { // 통역사인 경우
      return translatorApi.get(bindParams, user);
    }

    throw new UnauthorizedError('잘못된 토큰입니다.');
  },

  modify(bindParams, user) {
    if (user.id !== undefined) {
      return userApi.modify(bindParams, user);
    } else if (user.translatorId !== undefined) {
      return translatorApi.modify(bindParams, user);
    }

    throw new UnauthorizedError('잘못된 토큰입니다.');
  },

  delete(bindParams, user) {
    if (user.id !== undefined) {
      return userApi.delete(bindParams, user);
    } else if (user.translatorId !== undefined) {
      return translatorApi.delete(bindParams, user);
    }

    throw new UnauthorizedError('잘못된 토큰입니다.');
  },

  getService(bindParams, user) {
    return servicesApi.find(bindParams, user);
  },
};
