const express = require('express');
const router = express.Router();
const articulosController = require('../controllers/articulosController.');

router.get('/', articulosController.getArticulos);
router.post('/', articulosController.crearArticulo);

module.exports = router;
