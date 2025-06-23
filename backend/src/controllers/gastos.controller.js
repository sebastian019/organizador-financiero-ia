const xlsx = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const procesarCartola = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const buffer = req.file.buffer;
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { range: 18 });

    function parseFecha(str) {
      const meses = {
        'Ene': '01', 'Feb': '02', 'Mar': '03', 'Abr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Ago': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dic': '12'
      };
      const [dia, mes] = str.split('/');
      return `${meses[mes]}-${dia.padStart(2, '0')}`;
    }

    await prisma.gasto.deleteMany({
      where: { id_usuario: id_usuario }
    });

    for (let row of data) {
      if (!row["Fecha"] || !row["Descripción"]) continue;

      await prisma.gasto.create({
        data: {
          descripcion: row["Descripción"],
          fecha: new Date(`2024-${parseFecha(row["Fecha"])}`),
          abono: row["Abonos"] ? Number(row["Abonos"].toString().replace(/\./g, '').replace(',', '.')) : 0,
          gasto: row["Cargos"] ? Number(row["Cargos"].toString().replace(/\./g, '').replace(',', '.')) : 0,
          saldo: row["Saldo"] ? Number(row["Saldo"].toString().replace(/\./g, '').replace(',', '.')) : null,
          id_usuario: id_usuario
        }
      });
    }

    res.status(200).json({ mensaje: 'Cartola procesada exitosamente.' });
  } catch (error) {
    console.error('Error al procesar cartola:', error);
    res.status(500).json({ error: 'Error interno al procesar la cartola.' });
  }
};

const obtenerTotalesPorDescripcion = async (req, res) => {
  const id_usuario = req.user.id_usuario;

  try {
    const gastos = await prisma.gasto.groupBy({
      by: ['descripcion'],
      where: { id_usuario: id_usuario },
      _sum: {
        abono: true,
        gasto: true,
      },
    });

    const resultados = gastos.map(g => ({
      descripcion: g.descripcion,
      totalAbonos: g._sum.abono || 0,
      totalGastos: g._sum.gasto || 0,
    }));

    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar los gastos.' });
  }
};

const verificarCartolaCargada = async (req, res) => {
  const id_usuario = req.user.id_usuario;

  try {
    const cantidad = await prisma.gasto.count({
      where: { id_usuario }
    });

    res.json({ cargada: cantidad > 0 });
  } catch (error) {
    console.error('Error al verificar cartola:', error);
    res.status(500).json({ error: 'Error al verificar la cartola' });
  }
};

const obtenerSaldoActual = async (req, res) => {
  try {
    const userId = req.user.id_usuario;

    const ultimoGasto = await prisma.gasto.findFirst({
      where: { id_usuario: userId },
      orderBy: { fecha: 'desc' },
      select: { saldo: true },
    });

    const saldoSeguro = (ultimoGasto && typeof ultimoGasto.saldo === 'number') 
      ? ultimoGasto.saldo 
      : 0;

    res.status(200).json({ saldo: saldoSeguro });
  } catch (error) {
    console.error('Error al obtener saldo actual:', error);
    res.status(500).json({ error: 'Error al obtener saldo actual' });
  }
};


const registrarCompraAccion = async (req, res) => {
  const { descripcion, fecha, monto, id_usuario, saldo_actualizado } = req.body;

  try {
    const gasto = await prisma.gasto.create({
      data: {
        descripcion,
        fecha: new Date(fecha),
        gasto: monto,
        saldo: saldo_actualizado,
        abono: null,
        id_usuario
      }
    });

    res.json(gasto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar la compra como gasto.' });
  }
};


module.exports = {
  procesarCartola,
  obtenerTotalesPorDescripcion,
  verificarCartolaCargada,
  obtenerSaldoActual,
  registrarCompraAccion
};