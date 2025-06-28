const authController = require('../src/controllers/authController');
const db = require('../src/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../src/models');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

//TESTES DE AUTENTICAÇÃO 

describe('authController.login', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test('login admin com sucesso', async () => {
    req.body.user = 'adm123';
    req.body.password = 'senha123';

    db.Admin.findOne.mockResolvedValue({
      user: 'adm123',
      password: 'hash',
      nome_admin: 'Admin Test',
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token123');

    await authController.login(req, res);

    expect(db.Admin.findOne).toHaveBeenCalledWith({ where: { user: 'adm123' } });
    expect(bcrypt.compare).toHaveBeenCalledWith('senha123', 'hash');
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 'adm123', tipo: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    expect(res.json).toHaveBeenCalledWith({
      token: 'token123',
      usuario: {
        id: 'adm123',
        nome: 'Admin Test',
        tipo: 'admin',
      },
    });
  });

  test('login aluno com sucesso', async () => {
    req.body.user = '20230001';
    req.body.password = 'senha123';

    db.Aluno.findOne.mockResolvedValue({
      aluno_id: 1,
      ra_aluno: '20230001',
      password: 'hash',
      nome_aluno: 'Aluno Test',
      data_nascimento: '2000-01-01',
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token123');

    await authController.login(req, res);

    expect(db.Aluno.findOne).toHaveBeenCalledWith({ where: { ra_aluno: '20230001' } });
    expect(bcrypt.compare).toHaveBeenCalledWith('senha123', 'hash');
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, tipo: 'aluno' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    expect(res.json).toHaveBeenCalledWith({
      token: 'token123',
      usuario: {
        id: 1,
        ra: '20230001',
        nome: 'Aluno Test',
        dataNascimento: '2000-01-01',
        tipo: 'aluno',
      },
    });
  });

  test('usuário não encontrado retorna 404', async () => {
    req.body.user = 'adm999';
    req.body.password = 'senha123';

    db.Admin.findOne.mockResolvedValue(null);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
  });

  test('senha incorreta retorna 401', async () => {
    req.body.user = 'adm123';
    req.body.password = 'senhaErrada';

    db.Admin.findOne.mockResolvedValue({
      user: 'adm123',
      password: 'hash',
      nome_admin: 'Admin Test',
    });
    bcrypt.compare.mockResolvedValue(false);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Senha incorreta' });
  });

  test('erro genérico retorna 500', async () => {
    // Silencia o console.error só neste teste
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    req.body.user = 'adm123';
    req.body.password = 'senha123';

    db.Admin.findOne.mockRejectedValue(new Error('DB fail'));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro no login' });

    // Restaura console.error após o teste
    consoleErrorSpy.mockRestore();
  });
});
