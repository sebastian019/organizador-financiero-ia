const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);



const verifyToken = require('../middlewares/auth.middleware');

router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Ruta protegida accedida correctamente',
    user: req.user
  });
});

module.exports = router;
