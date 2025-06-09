const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const agregar = async (req, res) => {
  const { username } = req.body;

  try {
    const usuarioLogeado = await prisma.user.findUnique({
      where: { username: req.user.username }, 
    });

    if (!usuarioLogeado?.id_familia) {
        // Crea una nueva familia
        const nuevaFamilia = await prisma.familia.create({
            data: {
            nombre: `${usuarioLogeado.username}-familia`,
            ingresos: 0
            },
        })

        await prisma.user.update({
            where: {
                id_usuario: usuarioLogeado.id_usuario,
            },
            data: {
                id_familia: nuevaFamilia.id_familia,
            }
        });
    }

    const usuarioAAgregar = await prisma.user.findUnique({
      where: { username },
    });

    if (!usuarioAAgregar) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (
        usuarioAAgregar.id_familia !== null &&
        usuarioLogeado.id_familia !== null &&
        usuarioAAgregar.id_familia === usuarioLogeado.id_familia
        ) {
        return res.status(400).json({ error: 'Este usuario ya es parte de tu familia' });
    }

    await prisma.user.update({
      where: { id_usuario: usuarioAAgregar.id_usuario },
      data: {
        id_familia: usuarioLogeado.id_familia,
      },
    });

    res.status(200).json({ message: 'Usuario agregado a tu familia' });
  } catch (error) {
    
    console.error('Error al agregar familiar:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


const editar = async (req, res) => {
    const { apodo } = req.body;
    const { id_usuario } = req.params;

    try {
        const user = await prisma.user.update({
            where: {
                id_usuario: parseInt(id_usuario), // usa el nombre correcto de tu PK
            },
            data: {
                apodo
            },
        });
        res.status(201).json({ message: 'Familiar actualizado exitosamente' });
    }   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const eliminar = async (req, res) => {
    const id_usuario = parseInt(req.params.id_usuario);

  try {
    const usuarioActualizado = await prisma.user.update({
      where: { id_usuario: id_usuario },
      data: {
        id_familia: null
      }
    });

    res.status(200).json({ message: 'Usuario removido de la familia correctamente' });
  } catch (error) {
    console.error('Error al remover usuario de la familia:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


const listar = async (req, res) => {
    try {
        const usuarioLogeado = await prisma.user.findUnique({
        where: { username: req.user.username },
    });

    if (!usuarioLogeado?.id_familia) {
      return res.status(400).json({ error: 'Usuario sin familia asignada' });
    }

    const miembros = await prisma.user.findMany({
      where: { id_familia: usuarioLogeado.id_familia },
      select: {
        id_usuario: true,
        username: true
      }
    });

    res.json(miembros);
  } catch (error) {
    console.error('Error al listar miembros:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { agregar, eliminar, editar, listar };
