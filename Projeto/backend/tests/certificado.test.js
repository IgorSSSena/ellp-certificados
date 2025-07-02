const certificadoController = require('../src/controllers/certificadoController');
const { Certificado } = require('../src/models');

describe('Certificado Controller', () => {
  let firstAlunoId;
  let firstCursoId;

  // 🔧 Antes de todos os testes, busca o primeiro id_aluno e id_curso existentes no banco
  beforeAll(async () => {
    const firstCert = await Certificado.findOne();
    if (firstCert) {
      firstAlunoId = firstCert.id_aluno;
      firstCursoId = firstCert.id_curso;
    } else {
      // Caso não exista nenhum, define IDs padrão para evitar undefined
      firstAlunoId = 1;
      firstCursoId = 1;
    }
  });

  it('Deve listar todos os certificados', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await certificadoController.listarCertificados(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  it('Deve listar certificados de um aluno específico', async () => {
    const req = { params: { id_aluno: firstAlunoId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await certificadoController.listarPorAluno(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  it('Deve criar certificados em massa', async () => {
    const req = {
      body: {
        certificados: [
          {
            id_curso: firstCursoId,
            id_aluno: firstAlunoId,
            esta_certificado: true,
            status: 'Concluído',
          },
        ],
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await certificadoController.criarCertificados(req, res);

    const statusCode = res.status.mock.calls[0][0];
    expect([201, 409]).toContain(statusCode); // Aceita 409 (duplicidade) como sucesso parcial
  });

  it('Deve atualizar um certificado', async () => {
    const req = {
      params: {
        id_aluno: firstAlunoId,
        id_curso: firstCursoId,
      },
      body: {
        esta_certificado: true,
        status: 'Emitido',
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await certificadoController.atualizarCertificado(req, res);

    const statusCode = res.status.mock.calls[0][0];
    expect([200, 404]).toContain(statusCode);
  });

  it('Deve deletar um certificado', async () => {
    const req = {
      params: {
        id_aluno: firstAlunoId,
        id_curso: firstCursoId,
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await certificadoController.deletarCertificado(req, res);

    const statusCode = res.status.mock.calls[0][0];
    expect([200, 404]).toContain(statusCode);
  });
});
