const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3001;
const IP = "0.0.0.0";
sequelize.sync().then(() => {
  const interfaces = os.networkInterfaces();
  //Deixar assim por enquanto, pq ta pegando o IP do docker, depois resolvo
  //Vou tentar deixar filé pra abrir externo
  //const localIP = Object.values(interfaces)
  //const localIP = 'localhost';

  app.listen(PORT, () => {
    console.log(`Rodando em: http://${IP}:${PORT}`);
    console.log(`Swagger:     http://${IP}:${PORT}/api-docs`);
  });

});
