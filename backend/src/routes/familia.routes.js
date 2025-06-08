const express = require('express');
const router = express.Router();

const { agregar, eliminar, editar, listar} = require('../controllers/familia.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/agregar',verifyToken, agregar);
router.put('/editar/:id_usuario', editar);
router.delete('/eliminar/:id_usuario', verifyToken, eliminar);
router.get('/listar', verifyToken, listar);

module.exports = router;