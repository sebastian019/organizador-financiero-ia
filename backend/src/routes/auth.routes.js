const express = require('express');
const router = express.Router();

const { register, login, deleteProfile } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { registerValidator, loginValidator, handleValidationErrors } = require('../validators/auth.validator');

// Ruta de registro con validación y manejo de errores
router.post('/register', registerValidator, handleValidationErrors, register);

// Ruta de login con validación y manejo de errores
router.post('/login', loginValidator, handleValidationErrors, login);

// Ruta protegida para obtener perfil
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Ruta protegida accedida correctamente', user: req.user });
});

// Ruta protegida para eliminar perfil
router.delete('/profile', verifyToken, deleteProfile);

module.exports = router;
