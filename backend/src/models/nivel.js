const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Nivel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nivel: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, { tableName: 'niveis', timestamps: false });
};