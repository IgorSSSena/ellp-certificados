const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso restrito a administradores' });
    }

    req.user = decoded; // se quiser usar o ID depois
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};
