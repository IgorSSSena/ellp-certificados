const express = require('express');
const router = express.Router();

const { cadastrarAluno } = require('../controllers/alunoController');
const ensureAdmin = require('../middlewares/ensureAdmin');


router.post('/alunos/cadastrar', ensureAdmin, cadastrarAluno);

module.exports = router;