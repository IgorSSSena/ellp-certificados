const bcrypt = require('bcryptjs');
const { Admin } = require('../models');

const adminController = {
  async cadastrarAdmin(req, res) {
    const { user, password, nome_admin } = req.body;

    try {
      // Verifica se já existe
      const existente = await Admin.findByPk(user);
      if (existente) {
        return res.status(400).json({ mensagem: 'Usuário já cadastrado.' });
      }

      // Criptografa a senha
      const senhaHash = await bcrypt.hash(password, 10);

      // Cria o admin
      await Admin.create({
        user,
        password: senhaHash,
        nome_admin
      });

      return res.status(201).json({ mensagem: 'Admin cadastrado com sucesso.' });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar admin.' });
    }
  }
};

module.exports = adminController;
