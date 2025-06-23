const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
// Middlewares
app.use(cors());
app.use(express.json());
// Rutas
const familiaRoutes = require('./routes/familia.routes');
const authRoutes = require('./routes/auth.routes');
const aiRoutes = require('./routes/ai.routes.js');
const inversionRoutes = require('./routes/inversion.routes');
const gastosRoutes = require('./routes/gastos.routes');

app.use('/api/familia', familiaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes); 
app.use('/api', inversionRoutes);
app.use('/api/gastos', gastosRoutes);

app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend del Organizador Financiero con IA!');
});

module.exports = app;