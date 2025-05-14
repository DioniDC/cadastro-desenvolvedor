const request = require('supertest');
const app = require('../app');

describe('Rotas de Desenvolvedor', () => {
  let desenvolvedorId;
  let nivelId;

  beforeAll(async () => {
    const nivelResponse = await request(app)
      .post('/api/niveis')
      .send({ nivel: 'Dioni Sem Conflito' });

    nivelId = nivelResponse.body.id;
  });

  afterAll(async () => {
    if (desenvolvedorId) await request(app).delete(`/api/desenvolvedores/${desenvolvedorId}`);
    if (nivelId) await request(app).delete(`/api/niveis/${nivelId}`);
  });

  it('deve criar um novo desenvolvedor', async () => {
    const response = await request(app)
      .post('/api/desenvolvedores')
      .send({
        nome: 'Dioni ta na SG',
        sexo: 'M',
        hobby: 'Testar Pra ver se da bao',
        data_nascimento: '1996-02-24',
        nivel_id: nivelId
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    desenvolvedorId = response.body.id;
  });

  it('listar os desenvolvedores', async () => {
    const response = await request(app)
      .get('/api/desenvolvedores');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Retorna o desenvolvedor do ID', async () => {
    const response = await request(app)
      .get(`/api/desenvolvedores/${desenvolvedorId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', desenvolvedorId);
  });

  it('Atualiza um desenvolvedor', async () => {
    const response = await request(app)
      .put(`/api/desenvolvedores/${desenvolvedorId}`)
      .send({
        nome: 'Dioni foi pra gazin',
        sexo: 'M',
        hobby: 'Testar Pra ver se da bao',
        data_nascimento: '1996-02-24',
        nivel_id: nivelId
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'Dioni foi pra gazin');
  });

  it('Deletar um desenvolvedor', async () => {
    const response = await request(app).delete(`/api/desenvolvedores/${desenvolvedorId}`);
    expect(response.status).toBe(204);
    desenvolvedorId = null;
  });

});
