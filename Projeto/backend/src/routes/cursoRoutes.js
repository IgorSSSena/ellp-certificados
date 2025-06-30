const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
//const authenticate = require('../middlewares/authenticate');
const ensureAdmin = require('../middlewares/ensureAdmin');

// Todas as rotas abaixo exigem autenticação e permissão de admin
//router.use(authenticate);
router.use(ensureAdmin);

router.get('/cursos/', cursoController.findAll);
router.get('/cursos/:id', cursoController.findById);
router.post('/cursos/', cursoController.create);
router.put('/cursos/:id', cursoController.update);
router.delete('/cursos/:id', cursoController.delete);

module.exports = router;