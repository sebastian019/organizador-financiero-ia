// backend/src/controllers/ai.controller.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('🔑 API KEY:', process.env.OPENAI_API_KEY);

const getFinancialAdvice = async (req, res) => {
  console.log('➡️ Entrando a getFinancialAdvice');
  try {
    const { prompt } = req.body;
    console.log('📨 Prompt recibido:', prompt);

    if (!prompt) {
      return res.status(400).json({ message: 'La pregunta es requerida.' });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Eres un asesor financiero experto en finanzas personales para Chile. Proporciona consejos claros, prácticos y seguros.' },
        { role: 'user', content: prompt }
      ],
      model: 'gpt-3.5-turbo',
    });

    const respuesta = completion.choices[0].message.content;
    console.log('✅ Respuesta generada:', respuesta);

    res.json({ advice: respuesta });
  } catch (error) {
    if (error.response) {
      console.error('❌ ERROR EN AI.CONTROLLER - RESPONSE DATA:', error.response.data);
    } else {
      console.error('❌ ERROR EN AI.CONTROLLER - GENERAL:', error.message || error);
    }

    res.status(500).json({
      message: 'Error interno al procesar tu consulta.',
      detalle: error.response?.data || error.message,
    });
  }
};

module.exports = {
  getFinancialAdvice
};
