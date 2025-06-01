const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ellp', 'ellproot', 'utfpr#2025', {
  host: 'ellpcert.mysql.database.azure.com',
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar:', error);
  }
})();
