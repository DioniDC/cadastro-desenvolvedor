const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'database.sqlite'),
  logging: false
});

const Nivel = require('./nivel')(sequelize);
const Desenvolvedor = require('./desenvolvedor')(sequelize);

Nivel.hasMany(Desenvolvedor, { foreignKey: 'nivel_id' });
Desenvolvedor.belongsTo(Nivel, { foreignKey: 'nivel_id' });

module.exports = { sequelize, Nivel, Desenvolvedor };