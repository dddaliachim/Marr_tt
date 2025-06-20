const db = require('../db/connection'); 
// Obtener todos los artículos (con tipo_nombre)
const getArticulos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id,
        a.marca,
        a.numero_serie,
        a.estado,
        a.hotel,
        t.nombre AS tipo_nombre
      FROM articulos a
      JOIN tipos_articulo t ON a.tipo_articulo_id = t.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener articulos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear nuevo articulo
const crearArticulo = async (req, res) => {
  try {
    const { tipo_articulo_id, marca, numero_serie, estado, hotel } = req.body;

    const [result] = await db.query(`
      INSERT INTO articulos (tipo_articulo_id, marca, numero_serie, estado, hotel)
      VALUES (?, ?, ?, ?, ?)
    `, [tipo_articulo_id, marca, numero_serie, estado, hotel]);

    res.status(201).json({ message: 'Articulo registrado', articuloId: result.insertId });
  } catch (error) {
    console.error('Error al crear articulo:', error);
    res.status(500).json({ message: 'Error al registrar el articulo' });
  }
};

module.exports = {
  getArticulos,
  crearArticulo
};
