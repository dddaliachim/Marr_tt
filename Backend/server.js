const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas públicas de auth
app.use('/api/auth', authRoutes);

// Otras rutas protegidas (usar el middleware authMiddleware)

// ... código restante...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto:${PORT}`));
