const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend del Organizador Financiero con IA!');
});

module.exports = app;
