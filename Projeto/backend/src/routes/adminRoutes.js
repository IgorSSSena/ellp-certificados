const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/admin/cadastrar', adminController.cadastrarAdmin);

module.exports = router;
