const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('District', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  tel: {
    type: Sequelize.STRING,
  },
}, {
  tableName: 'District',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
});
