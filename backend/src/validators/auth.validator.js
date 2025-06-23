const { body, validationResult } = require('express-validator');

const registerValidator = [
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('email')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo válido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('rut')
    .optional()
    .matches(/^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/).withMessage('Formato de RUT inválido'),

  body('region')
    .optional()
    .isLength({ min: 2 }).withMessage('La región debe ser válida'),

  body('comuna')
    .optional()
    .isLength({ min: 2 }).withMessage('La comuna debe ser válida'),
];

const loginValidator = [
  body('email')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo válido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
];

const handleValidationErrors = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

module.exports = {
  registerValidator,
  loginValidator,
  handleValidationErrors
};
