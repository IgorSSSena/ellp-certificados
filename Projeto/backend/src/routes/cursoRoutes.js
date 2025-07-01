const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
//const authenticate = require('../middlewares/authenticate');
const ensureAdmin = require('../middlewares/ensureAdmin');

// Todas as rotas abaixo exigem autenticação e permissão de admin
//router.use(authenticate);

router.get('/cursos/', ensureAdmin, cursoController.findAll);
router.get('/cursos/:id', ensureAdmin, cursoController.findById);
router.post('/cursos/', ensureAdmin, cursoController.create);
router.put('/cursos/:id', ensureAdmin, cursoController.update);
router.delete('/cursos/:id', ensureAdmin, cursoController.delete);

module.exports = router;