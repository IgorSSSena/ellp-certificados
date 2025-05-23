const bcrypt = require('bcryptjs');
const { Aluno } = require('../models');

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

    // Não retornar a senha
    const { password: _, ...alunoSemSenha } = novoAluno.toJSON();

    return res.status(201).json({ message: 'Aluno cadastrado com sucesso.', aluno: alunoSemSenha });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar aluno.', detalhes: err.message });
  }
};

module.exports = { cadastrarAluno };
