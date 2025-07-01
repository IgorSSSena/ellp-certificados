const adminController = require('../src/controllers/adminController');

// TESTE DE CADASTRO DE ADMIN
describe('Admin Controller', () => {
  it('Deve cadastrar um admin corretamente ou retornar 409 se já existir', async () => {
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

    const statusCode = res.status.mock.calls[0][0];

    // ✅ Aceita tanto 201 Created (novo cadastro) quanto 409 Conflict (já existente)
    expect([201, 409]).toContain(statusCode);

    if (statusCode === 201) {
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Admin cadastrado com sucesso.',
      });
    } else if (statusCode === 409) {
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Usuário já cadastrado.',
      });
    }
  });
});
