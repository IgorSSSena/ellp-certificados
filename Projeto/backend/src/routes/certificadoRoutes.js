const express = require('express');
const router = express.Router();

const certificadoController = require('../controllers/certificadoController');
const ensureAdmin = require('../middlewares/ensureAdmin');

// ✅ Listar todos os certificados (admin)
router.get('/certificado/', ensureAdmin, certificadoController.listarCertificados);

// ✅ Listar certificados de um aluno específico (admin ou futuramente autenticação aluno)
router.get('/certificado/:id_aluno', ensureAdmin, certificadoController.listarPorAluno);

// ✅ Listar certificados de um curso específico
router.get('/certificado/curso/:id_curso', ensureAdmin, certificadoController.listarPorCurso);

// ✅ Criar certificados (individual ou em massa) (admin)
router.post('/certificado/', ensureAdmin, certificadoController.criarCertificados);

// ✅ Atualizar certificado (admin)
router.put('/certificado/:id_aluno/:id_curso', ensureAdmin, certificadoController.atualizarCertificado);

// ✅ Deletar (remover vínculo aluno-curso) (admin)
router.delete('/certificado/:id_aluno/:id_curso', ensureAdmin, certificadoController.deletarCertificado);

module.exports = router;
