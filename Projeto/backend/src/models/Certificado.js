module.exports = (sequelize, DataTypes) => {
  const Certificado = sequelize.define('Certificado', {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_aluno: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    esta_certificado: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    data_conclusao: DataTypes.DATE // <- nova coluna adicionada
  }, {
    tableName: 'Certificado',
    timestamps: false
  });

  Certificado.associate = function(models) {
    Certificado.belongsTo(models.Aluno, { foreignKey: 'id_aluno' });
    Certificado.belongsTo(models.Curso, { foreignKey: 'id_curso' });
  };

  return Certificado;
};
