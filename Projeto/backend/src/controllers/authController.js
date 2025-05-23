// src/controllers/authController.js
const db = require('../models');
const Admin = db.Admin;
const Aluno = db.Aluno;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { user, password } = req.body;

  try {
    const isAdmin = user.startsWith('adm');
    const usuario = isAdmin 
      ? await Admin.findOne({ where: { user } }) 
      : await Aluno.findOne({ where: { ra_aluno: user } });

    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: isAdmin ? usuario.user : usuario.aluno_id, tipo: isAdmin ? 'admin' : 'aluno' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    if (isAdmin) {
      res.json({
      token,
      usuario: {
        id: usuario.user,
        nome: usuario.nome_admin,
        tipo: 'admin'
      }
     });
    }else{
      res.json({
        token,
        usuario: {
          id: usuario.aluno_id,
          ra: usuario.ra_aluno,
          nome: usuario.nome_aluno,
          dataNascimento: usuario.data_nascimento,
          tipo: 'aluno'
        }
      });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no login' });
  }
};
