const express = require('express');
const router = express.Router();
const multer = require('multer');
const { procesarCartola, obtenerTotalesPorDescripcion } = require('../controllers/gastos.controller');
const { verifyToken } = require('../middlewares/auth.middleware');


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/subir-cartola', verifyToken, upload.single('archivo'), procesarCartola);

router.get('/mios', verifyToken, obtenerTotalesPorDescripcion);

module.exports = router;
