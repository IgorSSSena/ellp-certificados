import React, { useState, useEffect } from "react";
import { Curso } from "../../interface/Curso";
import { Aluno } from "../../interface/Aluno";
import api from "../../services/api";
import "../../styles/course_manager.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";

const CourseManager: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [alunosCurso, setAlunosCurso] = useState<{ [key: number]: Aluno[] }>({});
  const [certificados, setCertificados] = useState<{ [key: number]: { [key: number]: boolean } }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAlunos, setSelectedAlunos] = useState<number[]>([]);
  const [formData, setFormData] = useState<Curso>({
    id_curso: 0,
    nome_curso: "",
    qtd_horas: 0,
    link_certificado: "",
    alunos: [],
  });

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get("/cursos");
        setCursos(response.data);
      } catch (err) {
        console.error("Erro ao buscar cursos:", err);
      }
    };

    const fetchAlunos = async () => {
      try {
        const response = await api.get("/alunos");
        setAlunos(response.data);
      } catch (err) {
        console.error("Erro ao buscar alunos:", err);
      }
    };

    fetchCursos();
    fetchAlunos();
  }, []);

  const toggleExpand = async (id: number) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      try {
        const response = await api.get(`/certificado/curso/${id}`);
        const alunosCertificados = response.data.map((cert: any) => cert.Aluno);
        const statusMap: { [key: number]: boolean } = {};
        response.data.forEach((cert: any) => {
          statusMap[cert.id_aluno] = cert.esta_certificado;
        });
        setAlunosCurso((prev) => ({ ...prev, [id]: alunosCertificados }));
        setCertificados((prev) => ({ ...prev, [id]: statusMap }));
      } catch (err) {
        console.error("Erro ao buscar alunos do curso:", err);
      }
      setExpanded(id);
    }
  };

  const toggleCertificadoAluno = async (idCurso: number, idAluno: number) => {
    const novoStatus = !certificados[idCurso]?.[idAluno];
    setCertificados((prev) => ({
      ...prev,
      [idCurso]: {
        ...prev[idCurso],
        [idAluno]: novoStatus,
      },
    }));

    try {
      await api.put(`/certificado/${idAluno}/${idCurso}`, {
        esta_certificado: novoStatus,
        status: novoStatus ? 'Concluído' : 'Removido',
        data_conclusao: novoStatus ? new Date().toISOString() : null,
      });
    } catch (err) {
      console.error('Erro ao atualizar certificado do aluno', err);
    }
  };

  const toggleTodosAlunos = async (idCurso: number) => {
    const alunosDoCurso = alunosCurso[idCurso] || [];

    for (const aluno of alunosDoCurso) {
      await toggleCertificadoAluno(idCurso, aluno.aluno_id);
    }
  };

  return (
    <div className="courseManager">
      <h2>Cursos Cadastrados</h2>
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
              <EditIcon onClick={(e) => {
                e.stopPropagation();
                setFormData(curso);
                setEditMode(true);
                setModalOpen(true);
              }} />
            </div>
            {expanded === curso.id_curso && (
              <div className="cursoDetalhes">
                <button onClick={(e) => { e.stopPropagation(); toggleTodosAlunos(curso.id_curso); }}>
                  Alternar Todos os Certificados
                </button>
                <table className="tabelaAlunos">
                  <thead>
                    <tr>
                      <th>Nome do Aluno</th>
                      <th>RA</th>
                      <th>Certificado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunosCurso[curso.id_curso]?.map((aluno) => (
                      <tr key={aluno.aluno_id}>
                        <td>{aluno.nome_aluno}</td>
                        <td>{aluno.ra_aluno}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={certificados[curso.id_curso]?.[aluno.aluno_id] || false}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleCertificadoAluno(curso.id_curso, aluno.aluno_id);
                            }}
                          />
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan={3}>Nenhum aluno vinculado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManager;
