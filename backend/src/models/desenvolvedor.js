const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Desenvolvedor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false,  unique: true },
    sexo: { type: DataTypes.STRING(1), allowNull: false },
    data_nascimento: { type: DataTypes.DATEONLY, allowNull: false },
    hobby: { type: DataTypes.STRING },
    nivel_id: { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'desenvolvedores', timestamps: false });
};