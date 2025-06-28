const alunoController = require('../src/controllers/alunoController');
//TESTE DE CADASTRO DE ALUNO
describe('Aluno Controller', () => {
  it('Deve cadastrar um aluno corretamente', async () => {
    const req = {
      body: {
        nome_aluno: 'Aluno Teste',
        ra_aluno: '2023123456',
        password: '123456',
        data_nascimento: '2000-01-01',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await alunoController.cadastrarAluno(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Aluno cadastrado com sucesso.',
      aluno: expect.objectContaining({
        nome_aluno: 'Aluno Teste',
        ra_aluno: '2023123456',
      }),
    }));
  });
});
