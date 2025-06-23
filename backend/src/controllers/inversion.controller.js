const prisma = require('../../prisma/client');

exports.registrarCompra = async (req, res) => {
  try {
    const { id_usuario, descripcion, fecha, gasto, saldo } = req.body;

    const nuevoGasto = await prisma.gasto.create({
      data: {
        id_usuario,
        descripcion,
        fecha: new Date(fecha),
        gasto: parseFloat(gasto),
        abono: null,
        saldo: parseFloat(saldo)
      }
    });

    res.status(201).json(nuevoGasto);
  } catch (error) {
    console.error('Error al registrar compra como gasto:', error);
    res.status(500).json({ error: 'Error al registrar compra' });
  }
};
