const express = require('express');
const router = express.Router();

const { agregar, eliminar, editar, listar} = require('../controllers/familia.controller');

router.post('/agregar', agregar);
router.put('/editar/:id_usuario', editar);
router.delete('/eliminar/:id_usuario', eliminar);
router.get('/listar', listar);

module.exports = router;