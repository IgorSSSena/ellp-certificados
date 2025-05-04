const cursoService = require('../src/services/curso.service');

jest.mock('../src/repositories/curso.repository');

const mockCurso = {
  id_curso: 1,
  nome_curso: 'Lógica de Programação',
  qtd_horas: 20,
  link_certificado: 'http://certificados.com/curso1',
};

describe('Curso Service', () => {
  it('deve criar um novo curso', async () => {
    const result = await cursoService.createCurso(mockCurso);
    expect(result.nome_curso).toBe('Lógica de Programação');
  });

  it('deve retornar todos os cursos', async () => {
    const result = await cursoService.getAllCursos();
    expect(Array.isArray(result)).toBe(true);
  });
});
