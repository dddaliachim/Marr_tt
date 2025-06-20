// const express = require('express');
// const router = express.Router();
// const empleadosController = require('../controllers/empleadosController');

// router.get('/', empleadosController.getEmpleados);
// router.post('/', empleadosController.crearEmpleado);

// module.exports = router;


 const express = require('express');
 const router = express.Router();
 const {
   obtenerEmpleados,
   crearEmpleado,
   editarEmpleado,
   eliminarEmpleado,
 } = require('../controllers/empleadosController');

 router.get('/', obtenerEmpleados);
 router.post('/', crearEmpleado);
 router.put('/:id', editarEmpleado);
 router.delete('/:id', eliminarEmpleado);

 module.exports = router;
