const { Service } = require('../../data');
const { NotExistError, BadRequestError } = require('../../error');

module.exports = {
  get({ id }) {
    if (id !== undefined) {
      return Service
        .findOne({
          where: { id },
        })
        .then((service) => {
          if (!service) { throw new NotExistError('존재하지 않는 예약입니다.'); }
          return service;
        });
    }

    return Service
      .findAll({
        where: { },
      });
  },

  find({ userId, translatorId, date }, user) {
    const userID = userId || user.id;
    const translatorID = translatorId || user.translatorId;
    let condition = {};

    if (userID === undefined && translatorID === undefined) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    if (date) {
      if (userID && translatorID) {
        condition = { userId: userID, translatorId: translatorID, date };
      } else if (userID) {
        condition = { userId: userID, date };
      } else if (translatorID) {
        condition = { translatorId: translatorID, date };
      }
    } else if (!date) {
      if (userID && translatorID) {
        condition = { userId: userID, translatorId: translatorID };
      } else if (userID) {
        condition = { userId: userID };
      } else if (translatorID) {
        condition = { translatorId: translatorID };
      }
    }

    return Service
    .findAll({
      where: condition,
    });
  },

  add({ userId, translatorId, status, date, startTime, endTime, location, purpose, inquiry }) {
    console.log(userId, translatorId, status, date, startTime, endTime, location, purpose, inquiry);

    if (userId === undefined || !date || !startTime || !endTime || !location || !purpose) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return Service
      .create({
        userId,
        translatorId,
        date,
        startTime,
        endTime,
        location,
        purpose,
        inquiry,
        status: '대기중',
      });
  },

  modify({ id, userId, translatorId, status, date, startTime, endTime, location, purpose, inquiry }) {
    console.log(id, userId, translatorId, status, date, startTime, endTime, location, purpose, inquiry);

    if (id === undefined || (!userId && !translatorId && !status && !date && !startTime && !endTime && !location && !purpose && !inquiry)) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return Service
      .findOne({
        where: { id },
      })
      .then((service) => {
        if (!service) { throw new NotExistError('존재하지 않는 예약입니다.'); }

        return service.update({
          userId: (userId || service.userId),
          translatorId: (translatorId || service.translatorId),
          status: (status || service.status),
          date: (date || service.date),
          startTime: (startTime || service.startTime),
          endTime: (endTime || service.endTime),
          location: (location || service.location),
          purpose: (purpose || service.purpose),
          inquiry: (inquiry || service.inquiry),
        });
      });
  },

  delete({ id }) {
    if (id === undefined) { throw new BadRequestError('요청 Parameter가 잘못되었습니다.'); }

    return Service
      .findOne({
        where: { id },
      })
      .then((service) => {
        if (!service) { throw new NotExistError('존재하지 않는 예약입니다.'); }

        return service.destroy();
      });
  },
};
