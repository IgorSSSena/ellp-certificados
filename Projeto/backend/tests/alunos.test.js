const alunoService = require('../src/services/aluno.service');

jest.mock('../src/repositories/aluno.repository');

const mockAluno = {
  aluno_id: 1,
  nome_aluno: 'João da Silva',
  ra_aluno: 123456,
  data_nascimento: '2001-01-01',
};

describe('Aluno Service', () => {
  it('deve criar um novo aluno', async () => {
    const result = await alunoService.createAluno(mockAluno);
    expect(result).toEqual(expect.objectContaining({ nome_aluno: 'João da Silva' }));
  });

  it('deve retornar lista de alunos', async () => {
    const result = await alunoService.getAllAlunos();
    expect(Array.isArray(result)).toBe(true);
  });
});
