const express = require('express');
const router = express.Router();
const { registrarCompra } = require('../controllers/inversion.controller');

router.post('/inversion/comprar', registrarCompra);

module.exports = router;
