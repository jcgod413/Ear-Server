const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('Service', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  translatorId: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
  startTime: {
    type: Sequelize.STRING,
  },
  endTime: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  purpose: {
    type: Sequelize.STRING,
  },
  inquiry: {
    type: Sequelize.STRING,
  },
}, {
  tableName: 'Service',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
});
