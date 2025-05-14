const app = require('./app');
const { sequelize } = require('./models');
const os = require('os');

const PORT = 3001;
const IP = 'localhost';

sequelize.sync().then(() => {
  const interfaces = os.networkInterfaces();

  app.listen(PORT, () => {
    console.log(`Rodando em: http://${IP}:${PORT}`);
    console.log(`Swagger:     http://${IP}:${PORT}/api-docs`);
  });
});
