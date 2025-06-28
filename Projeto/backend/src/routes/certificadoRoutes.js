const express = require('express');
const router = express.Router();

const certificadoController = require('../controllers/certificadoController');
const ensureAdmin = require('../middlewares/ensureAdmin');

// ✅ Listar todos os certificados (admin)
router.get('/', ensureAdmin, certificadoController.listarCertificados);

// ✅ Listar certificados de um aluno específico (admin ou futuramente autenticação aluno)
router.get('/:id_aluno', ensureAdmin, certificadoController.listarPorAluno);

// ✅ Criar certificados (individual ou em massa) (admin)
router.post('/', ensureAdmin, certificadoController.criarCertificados);

// ✅ Atualizar certificado (admin)
router.put('/:id_aluno/:id_curso', ensureAdmin, certificadoController.atualizarCertificado);

// ✅ Deletar (remover vínculo aluno-curso) (admin)
router.delete('/:id_aluno/:id_curso', ensureAdmin, certificadoController.deletarCertificado);

module.exports = router;
