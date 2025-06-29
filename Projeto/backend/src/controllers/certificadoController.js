const { Certificado, Aluno, Curso } = require('../models');

// ✅ Listar todos os certificados com Aluno e Curso
const listarCertificados = async (req, res) => {
  try {
    const certificados = await Certificado.findAll({
      include: [Aluno, Curso]
    });
    res.json(certificados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar certificados.', detalhes: err.message });
  }
};

// ✅ Listar certificados de um aluno específico
const listarPorAluno = async (req, res) => {
  const { id_aluno } = req.params;
  try {
    const certificados = await Certificado.findAll({
      where: { id_aluno },
      include: [Curso]
    });
    res.json(certificados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar certificados do aluno.', detalhes: err.message });
  }
};

// ✅ Listar certificados de um curso específico (para vinculação)
const listarPorCurso = async (req, res) => {
  const { id_curso } = req.params;
  try {
    const certificados = await Certificado.findAll({
      where: { id_curso },
      include: [Aluno] // para retornar dados completos do aluno vinculado
    });
    res.json(certificados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar certificados do curso.', detalhes: err.message });
  }
};


// ✅ Criar certificados (individual ou massa)
const criarCertificados = async (req, res) => {
  const { certificados } = req.body;

  if (!certificados || !Array.isArray(certificados) || certificados.length === 0)
    return res.status(400).json({ error: 'Envie uma lista de certificados para cadastro.' });

  try {
    const inseridos = [];
    for (const c of certificados) {
      const { id_curso, id_aluno, esta_certificado, status, data_conclusao } = c;

      // Validação: impedir duplicidade
      const existente = await Certificado.findOne({ where: { id_curso, id_aluno } });
      if (existente) continue; // pula duplicados

      const novo = await Certificado.create({
        id_curso,
        id_aluno,
        esta_certificado: esta_certificado || false,
        status: status || 'em andamento',
        data_conclusao: data_conclusao || null
      });
      inseridos.push(novo);
    }

    res.status(201).json({ message: 'Certificados cadastrados com sucesso.', inseridos });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar certificados.', detalhes: err.message });
  }
};

// ✅ Atualizar certificado
const atualizarCertificado = async (req, res) => {
  const { id_aluno, id_curso } = req.params;
  const { esta_certificado, status, data_conclusao } = req.body;

  try {
    const cert = await Certificado.findOne({ where: { id_aluno, id_curso } });
    if (!cert) return res.status(404).json({ error: 'Certificado não encontrado.' });

    cert.esta_certificado = esta_certificado !== undefined ? esta_certificado : cert.esta_certificado;
    cert.status = status || cert.status;
    cert.data_conclusao = data_conclusao || cert.data_conclusao;

    await cert.save();

    res.json({ message: 'Certificado atualizado com sucesso.', cert });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar certificado.', detalhes: err.message });
  }
};

// ✅ Deletar (remover vínculo aluno-curso)
const deletarCertificado = async (req, res) => {
  const { id_aluno, id_curso } = req.params;

  try {
    const cert = await Certificado.findOne({ where: { id_aluno, id_curso } });
    if (!cert) return res.status(404).json({ error: 'Certificado não encontrado.' });

    await cert.destroy();
    res.json({ message: 'Certificado deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar certificado.', detalhes: err.message });
  }
};

module.exports = {
  listarCertificados,
  listarPorAluno,
  listarPorCurso,
  criarCertificados,
  atualizarCertificado,
  deletarCertificado
};
