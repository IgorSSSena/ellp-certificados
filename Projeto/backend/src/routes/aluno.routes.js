const express = require('express');
const router = express.Router();
const db = require('../models'); // ajuste o caminho se necessário
const Aluno = db.Aluno;

router.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});

module.exports = router;
