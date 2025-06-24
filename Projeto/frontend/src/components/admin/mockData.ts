import { Aluno } from "../../interface/Aluno";
import { Curso } from "../../interface/Curso";



export const mockAlunos: Aluno[] = [
  {
    aluno_id: 1,
    nome_aluno: "Igor Sena",
    ra_aluno: "2418274",
    data_nascimento: "2002-03-14",
    password: "********",
    cursos: ["Programação Web", "Estrutura de Dados"],
  },
  {
    aluno_id: 2,
    nome_aluno: "Ana Paula",
    ra_aluno: "2418275",
    data_nascimento: "2003-07-10",
    password: "********",
    cursos: ["Programação Web"],
  },
];

export const mockCursos: Curso[] = [
  {
    id_curso: 101,
    nome_curso: "Programação Web",
    qtd_horas: 40,
    link_certificado: "https://certificados.com/101",
    alunos: ["Igor Sena", "Ana Paula"],
  },
  {
    id_curso: 102,
    nome_curso: "Estrutura de Dados",
    qtd_horas: 60,
    link_certificado: "https://certificados.com/102",
    alunos: ["Igor Sena"],
  },
];
