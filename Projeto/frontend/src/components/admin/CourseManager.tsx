import React, { useState } from "react";
import { Curso } from "../../interface/Curso";
import { Aluno } from "../../interface/Aluno";
import { mockAlunos, mockCursos } from "./mockData";
import "../../styles/course_manager.css";

const CourseManager: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>(
    mockCursos.map((curso) => ({
      ...curso,
      status: curso.status || "andamento", // Definir status padrão se não tiver
    }))
  );

  const [expanded, setExpanded] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState<Curso>({
    id_curso: cursos.length + 1,
    nome_curso: "",
    qtd_horas: 0,
    link_certificado: "",
    alunos: [],
    status: "andamento",
  });

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCursos([...cursos, formData]);
    setFormData({
      id_curso: cursos.length + 2,
      nome_curso: "",
      qtd_horas: 0,
      link_certificado: "",
      alunos: [],
      status: "andamento",
    });
    setModalOpen(false);
  };

  const handleFinalizarCurso = (id: number) => {
    setCursos((prevCursos) =>
      prevCursos.map((curso) =>
        curso.id_curso === id ? { ...curso, status: "finalizado" } : curso
      )
    );
  };

  return (
    <div className="courseManager">
      <div className="managerHeader">
        <h2>Cursos Cadastrados</h2>
        <button onClick={() => setModalOpen(true)}>Adicionar Curso</button>
      </div>

      <div className="gridCursos">
        {cursos.map((curso) => (
          <div
            key={curso.id_curso}
            className="cursoCard"
            onClick={() => toggleExpand(curso.id_curso)}
          >
            <div className="cursoHeader">
              <span>{curso.nome_curso}</span>
              <span>{curso.qtd_horas} horas</span>

              {curso.status === "andamento" ? (
                <button
                  className="btnFinalizar"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFinalizarCurso(curso.id_curso);
                  }}
                >
                  Finalizar Curso
                </button>
              ) : (
                <span>
                  Status:{" "}
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Finalizado
                  </span>
                </span>
              )}
            </div>

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
                              <button className="btnCertificado">
                                Gerar Certificado
                              </button>
                            ) : (
                              <span>Curso em andamento</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit} className="modalForm">
            <h3>Novo Curso</h3>
            <input
              type="text"
              placeholder="Nome do curso"
              value={formData.nome_curso}
              onChange={(e) =>
                setFormData({ ...formData, nome_curso: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Carga horária"
              value={formData.qtd_horas}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  qtd_horas: Number(e.target.value),
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Link para certificado"
              value={formData.link_certificado}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  link_certificado: e.target.value,
                })
              }
              required
            />
            <select
              multiple
              value={formData.alunos}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions).map(
                  (opt) => opt.value
                );
                setFormData({ ...formData, alunos: options });
              }}
            >
              {mockAlunos.map((aluno) => (
                <option key={aluno.aluno_id} value={aluno.nome_aluno}>
                  {aluno.nome_aluno}
                </option>
              ))}
            </select>
            <button type="submit">Cadastrar</button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CourseManager;
