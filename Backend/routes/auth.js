const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Rutas públicas
router.post('/', registerUser);
router.post('/', loginUser);

module.exports = router;
