const db = require('../models');
const Curso = db.Curso;

// Listar todos os cursos
exports.findAll = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.json(cursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar cursos' });
  }
};

// Buscar curso por ID
exports.findById = async (req, res) => {
  const { id } = req.params;
  try {
    const curso = await Curso.findByPk(id);
    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });
    res.json(curso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar curso' });
  }
};

// Buscar curso por ID do aluno logado
exports.findByAluno = async (req, res) => {
  try {
    const alunoId = req.user.id; // id do aluno logado

    const cursos = await db.Curso.findAll({
      include: {
        model: db.Certificado,
        where: { id_aluno: alunoId },
        required: true,
         include: [
            {
              model: db.Aluno,
              attributes: ['nome_aluno'] // trás apenas o nome do aluno
            }
          ]
      }
    });

    res.json(cursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar cursos do aluno' });
  }
};


// Criar novo curso
exports.create = async (req, res) => {
  const { nome_curso, qtd_horas, link_certificado } = req.body;

  if (!nome_curso) {
    return res.status(400).json({ message: 'O campo nome_curso é obrigatório' });
  }

  try {
    const novoCurso = await Curso.create({ nome_curso, qtd_horas, link_certificado });
    res.status(201).json(novoCurso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar curso' });
  }
};

// Atualizar curso
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome_curso, qtd_horas, link_certificado } = req.body;

  try {
    const curso = await Curso.findByPk(id);
    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });

    curso.nome_curso = nome_curso || curso.nome_curso;
    curso.qtd_horas = qtd_horas || curso.qtd_horas;
    curso.link_certificado = link_certificado || curso.link_certificado;

    await curso.save();
    res.json(curso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar curso' });
  }
};

// Deletar curso
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const curso = await Curso.findByPk(id);
    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });

    await curso.destroy();
    res.json({ message: 'Curso deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar curso' });
  }
};
