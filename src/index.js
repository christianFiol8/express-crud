const express = require('express');
const checkAuth = require('./middleware/checkAuth');
const checkToken = require('./middleware/checkToken');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(checkAuth);
app.use(checkToken);

app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta ${req.method} ${req.path} no encontrada.` });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});