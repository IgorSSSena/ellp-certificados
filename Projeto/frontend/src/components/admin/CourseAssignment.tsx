import React, { useState } from "react";
import { mockAlunos, mockCursos } from "./mockData";
import { Curso } from "../../interface/Curso";

const CourseManager: React.FC = () => {
const [cursos, setCursos] = useState<Curso[]>(mockCursos.map(curso => ({
  ...curso,
  status: curso.status || "andamento"
})));
  const [titulo, setTitulo] = useState("");
  const [alunosSelecionados, setAlunosSelecionados] = useState<number[]>([]);

  const handleAlunoToggle = (alunoId: number) => {
    setAlunosSelecionados((prev) =>
      prev.includes(alunoId)
        ? prev.filter((id) => id !== alunoId)
        : [...prev, alunoId]
    );
  };

  const handleAddCurso = () => {
    const novoCurso = {
      id: Date.now(),
      titulo,
      alunos: alunosSelecionados,
    };
    setCursos([...cursos, novoCurso]);
    setTitulo("");
    setAlunosSelecionados([]);
  };

  const handleDeleteCurso = (cursoId: number) => {
    setCursos(cursos.filter((curso) => curso.id !== cursoId));
  };

  const handleFinalizarCurso = (id: number) => {
  setCursos(cursos.map(curso =>
    curso.id_curso === id ? { ...curso, status: "finalizado" } : curso
  ));
};


  return (
    <div className="courseManager">
      <h2>Gerenciar Cursos</h2>

      <div className="cursoForm">
        <input
          type="text"
          placeholder="Título do Curso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <div className="checkboxContainer">
          {mockAlunos.map((aluno) => (
            <label key={aluno.id}>
              <input
                type="checkbox"
                checked={alunosSelecionados.includes(aluno.id)}
                onChange={() => handleAlunoToggle(aluno.id)}
              />
              {aluno.nome}
            </label>
          ))}
        </div>
        <button onClick={handleAddCurso}>Adicionar Curso</button>
        {expanded === curso.id_curso && (
    <div className="cursoDetalhes">
      <table className="tabelaAlunos">
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>RA</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mockAlunos
            .filter((a) => curso.alunos.includes(a.nome_aluno))
            .map((aluno) => (
              <tr key={aluno.aluno_id}>
                <td>{aluno.nome_aluno}</td>
                <td>{aluno.ra_aluno}</td>
                <td>
                  {curso.status === "finalizado" ? (
                    <button className="btnCertificado">Gerar Certificado</button>
                  ) : (
                    <span>Curso em andamento</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {curso.status === "andamento" && (
        <button className="btnFinalizar" onClick={(e) => {
          e.stopPropagation();  // Para não fechar o expand ao clicar no botão
          handleFinalizarCurso(curso.id_curso);
        }}>
          Finalizar Curso
        </button>
      )}
    </div>
  )}
      </div>

      <ul className="listaCursos">
        {cursos.map((curso) => (
          <li key={curso.id}>
            <strong>{curso.titulo}</strong><br />
            Alunos: {curso.alunos?.map(id => mockAlunos.find(a => a.id === id)?.nome).join(", ") || "Nenhum"}
            <br />
            <button onClick={() => handleDeleteCurso(curso.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManager;
