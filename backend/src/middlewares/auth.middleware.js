const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secretoSuperSeguro';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // El token debe venir en el formato: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    // Agregar los datos del usuario a la request
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
