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

// ✅ Todas as rotas protegidas para admin
router.use(ensureAdmin);

// Listar todos
router.get('/alunos', listarAlunos);

// Buscar por ID
router.get('/alunos/:id', buscarAlunoPorId);

// Cadastrar aluno
router.post('/alunos', cadastrarAluno);

// Atualizar aluno
router.put('/alunos/:id', atualizarAluno);

// Deletar aluno
router.delete('/alunos/:id', deletarAluno);

module.exports = router;
