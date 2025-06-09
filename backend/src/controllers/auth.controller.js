const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SECRET = process.env.JWT_SECRET || 'secretoSuperSeguro';

const register = async (req, res) => {
  const { username, email, password, rut, region, comuna } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Usuario o correo ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        rut,
        region,
        comuna,
      },
    });

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign(
    { id_usuario: user.id_usuario, username: user.username, role: user.role },
    SECRET,
    { expiresIn: '2h' }
  );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const deleteProfile = async (req, res) => {
  // El userId lo obtenemos del token que ya fue verificado
  const id_usuario = req.user.id_usuario; 

  try {
    await prisma.user.delete({
      where: {
        id_usuario: id_usuario,
      },
    });

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    // Este error ('P2025') ocurre si el registro a borrar no existe.
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(500).json({ error: 'Error en el servidor al eliminar el perfil' });
  }
};



module.exports = { register, login, deleteProfile };
