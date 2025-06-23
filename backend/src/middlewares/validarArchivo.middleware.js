const XLSX = require('xlsx');

const validarArchivoExcel = (req, res, next) => {
  const archivo = req.file;

  if (!archivo) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo.' });
  }

  try {
    const workbook = XLSX.read(archivo.buffer, { type: 'buffer' });
    const hoja = workbook.SheetNames[0];
    const datos = XLSX.utils.sheet_to_json(workbook.Sheets[hoja], { header: 1 });

    const columnasEsperadas = ["Fecha", "Descripción", "N° Operación", "Abonos", "Cargos", "Saldo"];
    const filaEncabezado = datos.find(fila =>
      columnasEsperadas.every(col => fila.includes(col))
    );

    if (!filaEncabezado) {
      return res.status(400).json({
        error: 'El archivo no tiene el formato esperado. Asegúrese de subir una cartola válida de BancoEstado.'
      });
    }

    next();
  } catch (err) {
    console.error('Error al validar archivo Excel:', err);
    return res.status(500).json({ error: 'Error al procesar el archivo.' });
  }
};

module.exports = { validarArchivoExcel };