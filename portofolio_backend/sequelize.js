const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('portofolio_db', 'postgres', 'your_password', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
});

module.exports = sequelize;
