const bcrypt = require('bcryptjs');
const { Aluno } = require('../models');

// ✅ Listar todos
const listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      attributes: { exclude: ['password'] } // não retorna senha
    });
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar alunos.', detalhes: err.message });
  }
};

// ✅ Buscar por ID
const buscarAlunoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await Aluno.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado.' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar aluno.', detalhes: err.message });
  }
};

// ✅ Cadastrar (já existia)
const cadastrarAluno = async (req, res) => {
  const { nome_aluno, ra_aluno, password, data_nascimento } = req.body;

  if (!nome_aluno || !ra_aluno || !password)
    return res.status(400).json({ error: 'Campos obrigatórios: nome_aluno, ra_aluno, password.' });

  if (data_nascimento && isNaN(Date.parse(data_nascimento)))
    return res.status(400).json({ error: 'Data de nascimento inválida.' });

  try {
    const existente = await Aluno.findOne({ where: { ra_aluno } });
    if (existente)
      return res.status(409).json({ error: 'RA já cadastrado.' });

    const hash = await bcrypt.hash(password, 10);

    const novoAluno = await Aluno.create({
      nome_aluno,
      ra_aluno,
      data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
      password: hash
    });

    const { password: _, ...alunoSemSenha } = novoAluno.toJSON();
    return res.status(201).json({ message: 'Aluno cadastrado com sucesso.', aluno: alunoSemSenha });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar aluno.', detalhes: err.message });
  }
};

// ✅ Atualizar
const atualizarAluno = async (req, res) => {
  const { id } = req.params;
  const { nome_aluno, ra_aluno, password, data_nascimento } = req.body;

  try {
    const aluno = await Aluno.findByPk(id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado.' });

    if (ra_aluno && ra_aluno !== aluno.ra_aluno) {
      // Verifica duplicidade de RA
      const existente = await Aluno.findOne({ where: { ra_aluno } });
      if (existente)
        return res.status(409).json({ error: 'RA já cadastrado para outro aluno.' });
    }

    aluno.nome_aluno = nome_aluno || aluno.nome_aluno;
    aluno.ra_aluno = ra_aluno || aluno.ra_aluno;
    aluno.data_nascimento = data_nascimento || aluno.data_nascimento;

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      aluno.password = hash;
    }

    await aluno.save();

    const { password: _, ...alunoSemSenha } = aluno.toJSON();
    res.json({ message: 'Aluno atualizado com sucesso.', aluno: alunoSemSenha });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar aluno.', detalhes: err.message });
  }
};

// ✅ Deletar
const deletarAluno = async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await Aluno.findByPk(id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado.' });

    await aluno.destroy();
    res.json({ message: 'Aluno deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar aluno.', detalhes: err.message });
  }
};

module.exports = {
  listarAlunos,
  buscarAlunoPorId,
  cadastrarAluno,
  atualizarAluno,
  deletarAluno
};
