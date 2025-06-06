const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('🟡 Intentando login con:', email);

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log('🔴 Usuario no encontrado');
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    console.log('🟢 Usuario encontrado:', user.email);

    const isValid = await bcrypt.compare(password, user.password);
    console.log('🔍 ¿Contraseña válida?', isValid);

    if (!isValid) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: '2h' }
    );

    console.log('✅ Login exitoso');
    res.json({ token });
  } catch (error) {
    console.error('💥 Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
