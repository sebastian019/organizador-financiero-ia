const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const agregar = async (req, res) => {
    const { username, email} = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Nombre o correo ya registrado' });
        }

        const user = await prisma.user.create({
            data: {
                username,
                email
            },
        });
        res.status(201).json({ message: 'Familiar creado exitosamente' });
    }   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const editar = async (req, res) => {
    const { username, email} = req.body;
    const { id } = req.params;

    try {
        const user = await prisma.user.update({
            where: {
                id_usuario: parseInt(id), // usa el nombre correcto de tu PK
            },
            data: {
                username,
                email
            },
        });
        res.status(201).json({ message: 'Familiar actualizado exitosamente' });
    }   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const eliminar = async (req, res) => {
  // El userId lo obtenemos del token que ya fue verificado
  const userId = req.params.userId;

  try {
    // Gracias a la migración que hicimos, al borrar el usuario,
    // Prisma borrará también todos sus gastos asociados en cascada.
    await prisma.user.delete({
        where: {
            id_usuario: parseInt(userId),
        },
    });

    res.status(200).json({ message: 'Familiar eliminado correctamente' });
  } catch (error) {
    console.error(error);
    // Este error ('P2025') ocurre si el registro a borrar no existe.
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Familiar no encontrado' });
    }
    res.status(500).json({ error: 'Error en el servidor al eliminar el perfil' });
  }
};