const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('User', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  districtId: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  mdn: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
}, {
  tableName: 'User',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
  },
});
