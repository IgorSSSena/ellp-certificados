// src/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando com sucesso!');
});

app.listen(PORT, () => {
  console.log('Servidor backend rodando na porta ${PORT}');
});