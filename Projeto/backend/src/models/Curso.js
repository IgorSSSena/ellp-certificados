module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('Curso', {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_curso: DataTypes.STRING,
    qtd_horas: DataTypes.FLOAT,
    link_certificado: DataTypes.STRING
  }, {
    tableName: 'Curso',
    timestamps: false
  });

  Curso.associate = function(models) {
    Curso.hasMany(models.Certificado, { foreignKey: 'id_curso' });
  };

  return Curso;
};
