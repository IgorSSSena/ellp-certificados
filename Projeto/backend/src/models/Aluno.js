module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    aluno_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_aluno: DataTypes.STRING,
    ra_aluno: DataTypes.INTEGER,
    data_nascimento: DataTypes.DATE, 
    password: DataTypes.STRING,
  }, {
    tableName: 'Aluno',
    timestamps: false
  });

  Aluno.associate = function(models) {
    Aluno.hasMany(models.Certificado, { foreignKey: 'id_aluno' });
  };

  return Aluno;
};
