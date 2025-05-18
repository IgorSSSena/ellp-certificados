const express = require('express');
const app = express();
const alunoRoutes = require('./src/routes/aluno.routes'); // ajuste o caminho

app.use(express.json());
app.use('/api', alunoRoutes); // endpoint: /api/alunos

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
