const cursoController = require('../src/controllers/cursoController');

describe('Curso Controller', () => {
  it('Deve criar um curso corretamente', async () => {
    const req = {
      body: {
        nome_curso: 'Python para Ciência de Dados',
        qtd_horas: 10,
        link_certificado: 'http://certificado.com',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cursoController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      nome_curso: 'Python para Ciência de Dados',
      qtd_horas: 10,
      link_certificado: 'http://certificado.com',
    }));
  });
});
