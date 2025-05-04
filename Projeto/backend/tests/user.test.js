const request = require('supertest');
const app = require('../src/app'); // ajuste para seu server/Express

describe('GET /usuarios', () => {
  it('Deve retornar status 200 e um array de usuários', async () => {
    const response = await request(app).get('/usuarios');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
