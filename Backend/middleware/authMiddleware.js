const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token inválido' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token expirado o inválido' });

    req.user = decoded; { Id, userame, rol }
    next();
  });
};

// Middleware para verificar que el usuario sea admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
  next();
};

module.exports = { verifyToken, isAdmin };
