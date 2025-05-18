// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql10779608', 'sql10779608', 'R3LT9Z2qUi', {
  host: 'sql10.freesqldatabase.com',
  dialect: 'mysql'
});

module.exports = sequelize;