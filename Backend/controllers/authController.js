const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

// Registro de usuario
const registerUser = (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Validar rol válido  
  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Rol invitado' });
  }

  // Verificar si el usuario ya existe
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    if (results.length > 0) return res.status(400).json({ message: 'Email ya registrado' });

    // Hashear la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error al encriptar contraseña' });

      // Insertar usuario
      db.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role],
        (err, results) => {
          if (err) return res.status(500).json({ message: 'Error al registrar usuario' });
          res.status(201).json({ message: 'Usuario registrado correctamente' });
        }
      );
    });
  });
};

// Login usuario
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email y contraseña son obligatorios' });

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    if (results.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

    const user = results [0];

    // Comparar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error al verificar contraseña' });
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

      // Generar token de JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: { id: user.id, username: user.username, email: user.email, role: user.role }
      });
    });
  });
};

module.exports = { registerUser, loginUser};
 

// creado por Dalia Jimena Chim Uc
 
