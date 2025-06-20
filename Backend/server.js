const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const empleadosRoutes = require('./routes/empleadosRoutes');
const articulosRoutes = require('./routes/articulosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/articulos', articulosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));
