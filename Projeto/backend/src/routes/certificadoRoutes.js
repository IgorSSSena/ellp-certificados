const express = require('express');
const router = express.Router();

const certificadoController = require('../controllers/certificadoController');
const ensureAdmin = require('../middlewares/ensureAdmin');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// ✅ Listar todos os certificados (admin)
router.get('/certificado/',  certificadoController.listarCertificados);

// ✅ Listar certificados de um aluno específico (admin ou futuramente autenticação aluno)
router.get('/certificado/:id_aluno', certificadoController.listarPorAluno);

// ✅ Listar certificados de um curso específico
router.get('/certificado/curso/:id_curso',  certificadoController.listarPorCurso);

// ✅ Criar certificados (individual ou em massa) (admin)
router.post('/certificado/', ensureAdmin, certificadoController.criarCertificados);

// ✅ Atualizar certificado (admin)
router.put('/certificado/:id_aluno/:id_curso', ensureAdmin, certificadoController.atualizarCertificado);

// ✅ Deletar (remover vínculo aluno-curso) (admin)
router.delete('/certificado/:id_aluno/:id_curso', ensureAdmin, certificadoController.deletarCertificado);

// ✅ Gerar PDF do certificado (admin)
router.post('/certificado/gerar-pdf', ensureAuthenticated, certificadoController.gerarCertificadoPDF);

module.exports = router;
