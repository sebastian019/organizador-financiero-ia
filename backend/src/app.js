const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET);
// Rutas
const authRoutes = require('./routes/auth.routes');
const aiRoutes = require('./routes/ai.routes.js');
console.log(typeof aiRoutes);  // debería salir "function" o "object"


app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes); // ✅ esto requiere que aiRoutes sea un router

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend del Organizador Financiero con IA!');
});

module.exports = app;

const gastosRoutes = require('./routes/gastos.routes');
app.use('/api/gastos', gastosRoutes);