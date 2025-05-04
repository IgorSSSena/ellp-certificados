const certificadoService = require('../src/services/certificado.service');

jest.mock('../src/repositories/certificado.repository');

const mockCertificado = {
  id_curso: 1,
  id_aluno: 1,
  esta_certificado: true,
  status: 'Concluído',
};

describe('Certificado Service', () => {
  it('deve criar um certificado para um aluno em um curso', async () => {
    const result = await certificadoService.criarCertificado(mockCertificado);
    expect(result.esta_certificado).toBe(true);
  });

  it('deve buscar certificados de um aluno', async () => {
    const result = await certificadoService.getCertificadosPorAluno(1);
    expect(result).toBeDefined();
  });
});
