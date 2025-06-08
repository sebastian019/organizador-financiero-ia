const express = require('express');
const router = express.Router();

const { agregar, eliminar, editar} = require('../controllers/auth.controller');

router.post('/agregar', agregar);
router.put('/editar/:id', editar);
router.delete('/eliminar/:userId', eliminar);

module.exports = router;