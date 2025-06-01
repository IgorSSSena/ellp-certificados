// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    dialectOptions: {
      ssl: {
        // para Azure e outros servidores que exigem SSL
        rejectUnauthorized: true
      }
    },
    logging: false, 
  }
);

module.exports = sequelize;
