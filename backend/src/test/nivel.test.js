const request = require('supertest');
const app = require('../app');

describe('Rotas de Nível', () => {
  let nivelId;

  it('Cria novo nível', async () => {
    const response = await request(app)
      .post('/api/niveis')
      .send({
        nivel: 'Aprendende nivel 1 goodgood bombom'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    nivelId = response.body.id;
  });

  it('lista todos os níveis', async () => {
    const response = await request(app)
      .get('/api/niveis');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Retorna o Nivel do ID', async () => {
    const response = await request(app)
      .get(`/api/niveis/${nivelId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', nivelId);
  });

  it('Atualiza um nível', async () => {
    const response = await request(app)
      .put(`/api/niveis/${nivelId}`)
      .send({
        nivel: 'Pleno ' + Date.now()
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nivel');
  });

  it('Deleta um nível', async () => {
    const response = await request(app)
      .delete(`/api/niveis/${nivelId}`);

    expect(response.status).toBe(204);
  });
});
