const xlsx = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const procesarCartola = async (req, res) => {
  try {
    // 1. Verifica usuario autenticado (puedes usar req.user si tienes JWT middleware)
    const userId = req.user.userId; // Ajusta esto a tu middleware real

    // 2. Lee el archivo Excel subido
    const buffer = req.file.buffer;
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { range: 18 });

    console.log('Primer registro útil:', data[0]);

    function parseFecha(str) {
    // Convierte '07/Feb' a '02-07' (mes-día)
    const meses = { 'Ene': '01', 'Feb': '02', 'Mar': '03', 'Abr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Ago': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dic': '12' };
    const [dia, mes] = str.split('/');
    return `${meses[mes]}-${dia.padStart(2, '0')}`;
    }

    await prisma.gasto.deleteMany({
    where: { userId: userId }
    });


    // 3. Procesa y guarda cada gasto
    for (let row of data) {
    // Opcional: salta filas vacías o sin fecha/descripcion
    if (!row["Fecha"] || !row["Descripción"]) continue;

    await prisma.gasto.create({
        data: {
        descripcion: row["Descripción"],
        fecha: new Date(`2024-${parseFecha(row["Fecha"])}`), // Función para transformar la fecha (ver abajo)
        abono: row["Abonos"] ? Number(row["Abonos"].toString().replace(/\./g, '').replace(',', '.')) : 0,
        gasto: row["Cargos"] ? Number(row["Cargos"].toString().replace(/\./g, '').replace(',', '.')) : 0,
        saldo: row["Saldo"] ? Number(row["Saldo"].toString().replace(/\./g, '').replace(',', '.')) : null,
        userId: userId,
        }
    });
    }

    res.json({ message: 'Cartola procesada y guardada correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la cartola.' });
  }
};

module.exports = { procesarCartola };
