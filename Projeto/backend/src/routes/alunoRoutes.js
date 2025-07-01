const express = require('express');
const router = express.Router();

const {
  listarAlunos,
  buscarAlunoPorId,
  cadastrarAluno,
  atualizarAluno,
  deletarAluno
} = require('../controllers/alunoController');

const ensureAdmin = require('../middlewares/ensureAdmin');

// Listar todos
router.get('/alunos', ensureAdmin, listarAlunos);

// Buscar por ID
router.get('/alunos/:id', ensureAdmin, buscarAlunoPorId);

// Cadastrar aluno
router.post('/alunos', ensureAdmin, cadastrarAluno);

// Atualizar aluno
router.put('/alunos/:id', ensureAdmin, atualizarAluno);

// Deletar aluno
router.delete('/alunos/:id', ensureAdmin, deletarAluno);

module.exports = router;
