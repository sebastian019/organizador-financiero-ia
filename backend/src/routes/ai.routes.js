const express = require('express');
const router = express.Router();

const { getFinancialAdvice } = require('../controllers/ai.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Ruta protegida para consultar al asistente financiero
router.post('/consultar', verifyToken, getFinancialAdvice);

module.exports = router; 
