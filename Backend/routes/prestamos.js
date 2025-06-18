// backend/routes/prestamos.js
const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamosController');

// Crear préstamo
router.post('/', prestamosController.crearPrestamo);
// Listar prestamos
router.get('/', prestamosController.listarPrestamos);

// Devolver préstamo
router.put('/devolver/:id', prestamosController.devolverPrestamo);

module.exports = router;
