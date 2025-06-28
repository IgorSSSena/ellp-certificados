const adminController = require('../src/controllers/adminController');
//TESTE DE CADASTRO DE ADMIN

describe('Admin Controller', () => {
  it('Deve cadastrar um admin corretamente', async () => {
    const req = {
      body: {
        user: 'admin1',
        password: '123456',
        nome_admin: 'Admin Teste',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await adminController.cadastrarAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: 'Admin cadastrado com sucesso.',
    });
  });
});
