const alunoController = require('../src/controllers/alunoController');

// TESTE DE CADASTRO DE ALUNO
describe('Aluno Controller', () => {
  it('Deve cadastrar um aluno corretamente ou retornar 409 se já existir', async () => {
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

    const statusCode = res.status.mock.calls[0][0];

    // ✅ Aceita tanto 201 Created (novo cadastro) quanto 409 Conflict (RA já cadastrado)
    expect([201, 409]).toContain(statusCode);

    if (statusCode === 201) {
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Aluno cadastrado com sucesso.',
        aluno: expect.objectContaining({
          nome_aluno: 'Aluno Teste',
          ra_aluno: '2023123456',
        }),
      }));
    } else if (statusCode === 409) {
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: 'RA já cadastrado.',
      }));
    }
  });
});
