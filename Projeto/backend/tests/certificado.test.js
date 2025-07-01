const certificadoController = require('../src/controllers/certificadoController');

describe('Certificado Controller', () => {

  it('Deve listar todos os certificados', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await certificadoController.listarCertificados(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  it('Deve listar certificados de um aluno específico', async () => {
    const req = {
      params: {
        id_aluno: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await certificadoController.listarPorAluno(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  it('Deve criar certificados em massa', async () => {
    const req = {
      body: {
        certificados: [
          {
            id_curso: 1,
            id_aluno: 1,
            esta_certificado: true,
            status: 'Concluído',
          },
        ],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await certificadoController.criarCertificados(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Certificados cadastrados com sucesso.',
      inseridos: expect.any(Array),
    }));
  });

  it('Deve atualizar um certificado', async () => {
    const req = {
      params: {
        id_aluno: 1,
        id_curso: 1,
      },
      body: {
        esta_certificado: true,
        status: 'Emitido',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await certificadoController.atualizarCertificado(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Certificado atualizado com sucesso.',
    }));
  });

  it('Deve deletar um certificado', async () => {
    const req = {
      params: {
        id_aluno: 1,
        id_curso: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await certificadoController.deletarCertificado(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Certificado deletado com sucesso.',
    });
  });

});
