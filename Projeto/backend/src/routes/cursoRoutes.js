const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
//const authenticate = require('../middlewares/authenticate');
const ensureAdmin = require('../middlewares/ensureAdmin');

// Todas as rotas abaixo exigem autenticação e permissão de admin
//router.use(authenticate);
router.use(ensureAdmin);

router.get('/', cursoController.findAll);
router.get('/:id', cursoController.findById);
router.post('/', cursoController.create);
router.put('/:id', cursoController.update);
router.delete('/:id', cursoController.delete);

module.exports = router;