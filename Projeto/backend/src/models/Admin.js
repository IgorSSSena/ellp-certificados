module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    user: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    nome_admin: DataTypes.STRING
  }, {
    tableName: 'admin',
    timestamps: false
  });

  return Admin;
};
