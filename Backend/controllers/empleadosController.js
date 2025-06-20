// const pool = require('../db'); // Asumiendo que tienes pool configurado para MySQL

// // Obtener todos los empleados
// const obtenerEmpleados = async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM empleados');
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensaje: 'Error al obtener empleados' });
//   }
// };

// // Crear nuevo empleado
// const crearEmpleado = async (req, res) => {
//   try {
//     const { nombre, apellido } = req.body;
//     if (!nombre || !apellido)
//       return res.status(400).json({ mensaje: 'Faltan datos' });

//     const [result] = await pool.query('INSERT INTO empleados (nombre, apellido) VALUES (?, ?)', [nombre, apellido]);
//     const nuevoEmpleado = { id: result.insertId, nombre, apellido };
//     res.status(201).json(nuevoEmpleado);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensaje: 'Error al crear empleado' });
//   }
// };

// // Editar empleado
// const editarEmpleado = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nombre, apellido } = req.body;
//     if (!nombre || !apellido)
//       return res.status(400).json({ mensaje: 'Faltan datos' });

//     await pool.query('UPDATE empleados SET nombre = ?, apellido = ? WHERE id = ?', [nombre, apellido, id]);
//     res.json({ id: Number(id), nombre, apellido });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensaje: 'Error al editar empleado' });
//   }
// };

// // Eliminar empleado
// const eliminarEmpleado = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query('DELETE FROM empleados WHERE id = ?', [id]);
//     res.json({ mensaje: 'Empleado eliminado' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensaje: 'Error al eliminar empleado' });
//   }
// };

// module.exports = {
//   obtenerEmpleados,
//   crearEmpleado,
//   editarEmpleado,
//   eliminarEmpleado,
// };

const pool = require('../db'); // Asumiendo que tienes pool configurado para MySQL

// Obtener todos los empleados
const obtenerEmpleados = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empleados');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener empleados' });
  }
};

// Crear nuevo empleado
const crearEmpleado = async (req, res) => {
  try {
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido)
      return res.status(400).json({ mensaje: 'Faltan datos' });

    const [result] = await pool.query('INSERT INTO empleados (nombre, apellido) VALUES (?, ?)', [nombre, apellido]);
    const nuevoEmpleado = { id: result.insertId, nombre, apellido };
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear empleado' });
  }
};

// Editar empleado
const editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido)
      return res.status(400).json({ mensaje: 'Faltan datos' });

    await pool.query('UPDATE empleados SET nombre = ?, apellido = ? WHERE id = ?', [nombre, apellido, id]);
    res.json({ id: Number(id), nombre, apellido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al editar empleado' });
  }
};

// Eliminar empleado
const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM empleados WHERE id = ?', [id]);
    res.json({ mensaje: 'Empleado eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el empleado' });
  }
};

module.exports = {
  obtenerEmpleados,
  crearEmpleado,
  editarEmpleado,
  eliminarEmpleado,
};
