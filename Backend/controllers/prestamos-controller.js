// backend/controllers/prestamosController.js
const db = require('../db/connection');
// Función auxiliar para obtener las siglasd del hotel:)
const obtenerSiglasHotel = (hotel) => {
  if (hotel === 'JW Marriott') return 'JW';
  if (hotel === 'Marriott Resort') return 'MR';
  return 'XX';
};
// Funcion para obtener el numero de folio incremental
const generarFolio = async (hotel) => {
  const siglas = obtenerSiglasHotel(hotel);
  const [rows] = await db.query(
    `SELECT COUNT(*) AS total FROM prestamos WHERE folio LIKE ?`,
    [`${siglas}-%`]
  );
  const total = rows[0].total + 1;
  return `${siglas}-${String(total).padStart(4, '0')}`;
};
// Creamos nuevo prestamo
const crearPrestamo = async (req, res) => {
  try {
    const { articulo_id, empleado_id, creado_por } = req.body;

    // Verificamos el hotel del articulo
    const [[articulo]] = await db.query(
      `SELECT hotel FROM articulos WHERE id = ?`,
      [articulo_id]
    );

    if (!articulo) return res.status(404).json({ message: 'Artículo no encontrado' });

    // Generamos el folio
    const folio = await generarFolio(articulo.hotel);
    // Insertamos el prestamo
    await db.query(
      `INSERT INTO prestamos (folio, articulo_id, empleado_id, creado_por)
       VALUES (?, ?, ?, ?)`,
      [folio, articulo_id, empleado_id, creado_por]
    );

    // actyualizamos el estado del articulo a 'ocupado' para tener un mejor contrl
    await db.query(`UPDATE articulos SET estado = 'ocupado', empleado_id = ? WHERE id = ?`, [empleado_id, articulo_id]);

    res.status(201).json({ message: 'Préstamo registrado exitosamente', folio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ERROR: nose pudo registrar el pretamo'});
  }
};

// Listar todos los préstamos para su visualizacion futura en el front jiji
const listarPrestamos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, a.numero_serie, a.hotel, e.nombre AS nombre_empleado, e.apellido
      FROM prestamos p
      JOIN articulos a ON p.articulo_id = a.id
      JOIN empleados e ON p.empleado_id = e.id
      ORDER BY p.fecha_prestamo DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los préstamos' });
  }
};

// Devolver el prstamo (ya no se usara el articulo)
const devolverPrestamo = async (req, res) => {
  try {
    const { id } = req.params;

    // Cambiar estado del préstamo a 'devuelto' y registrar fecha
    await db.query(`
      UPDATE prestamos
      SET estado_prestamo = 'devuelto', fecha_devolucion = NOW()
      WHERE id = ?
    `, [id]);

    // Liberar el artículo
    const [[{ articulo_id }]] = await db.query(`SELECT articulo_id FROM prestamos WHERE id = ?`, [id]);

    await db.query(`
      UPDATE articulos
      SET estado = 'disponible', empleado_id = NULL
      WHERE id = ?
    `, [articulo_id]);

    res.json({ message: 'Artículo devuelto correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al devolver el préstamo' });
  }
};

module.exports
{
crearPrestamo,
listarPrestamos,
devolverPrestamo
}