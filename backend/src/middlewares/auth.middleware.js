// backend/src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secretoSuperSeguro';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //console.log('🛡️ Verificando token:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    //console.log('❌ Token no proporcionado');
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      //console.log('❌ Token inválido');
      return res.status(403).json({ error: 'Token inválido' });
    }
    //console.log('✅ Token válido. Usuario:', user);
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
