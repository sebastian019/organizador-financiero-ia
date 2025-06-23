const express = require('express');
const router = express.Router();
const multer = require('multer');
const { procesarCartola, obtenerTotalesPorDescripcion, verificarCartolaCargada,obtenerSaldoActual } = require('../controllers/gastos.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { validarArchivoExcel } = require('../middlewares/validarArchivo.middleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/subir-cartola',
  verifyToken,
  upload.single('archivo'),
  validarArchivoExcel,
  procesarCartola
);

router.get('/mios', verifyToken, obtenerTotalesPorDescripcion);
router.get('/existe', verifyToken, verificarCartolaCargada);
router.get('/saldo-actual', verifyToken, obtenerSaldoActual);


module.exports = router;
