// src/config/test.js
const sequelize = require('./database.js');

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com MySQL estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar no banco:', err);
  });
