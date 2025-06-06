const express = require('express');
const router = express.Router();
const multer = require('multer');
const { procesarCartola } = require('../controllers/gastos.controller');
const { verifyToken } = require('../middlewares/auth.middleware');


const storage = multer.memoryStorage();
const upload = multer({ storage });

// ¡Agrega verifyToken antes del controlador!
router.post('/subir-cartola', verifyToken, upload.single('archivo'), procesarCartola);

module.exports = router;