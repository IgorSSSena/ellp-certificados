const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
//const authenticate = require('../middlewares/authenticate');
const ensureAdmin = require('../middlewares/ensureAdmin');
const authenticate = require('../middlewares/authenticate');

// Todas as rotas abaixo exigem autenticação e permissão de admin
//router.use(authenticate);

// Rota para buscar cursos do aluno logado
router.get('/cursos/aluno', authenticate, cursoController.findByAluno);

router.get('/cursos/', cursoController.findAll);
router.get('/cursos/:id', cursoController.findById);


router.post('/cursos/', ensureAdmin, cursoController.create);
router.put('/cursos/:id', ensureAdmin, cursoController.update);
router.delete('/cursos/:id', ensureAdmin, cursoController.delete);

module.exports = router;