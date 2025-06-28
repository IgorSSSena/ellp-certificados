import React, { useState, useEffect } from "react";
import { mockCursos } from "./mockData";
import { Aluno } from "../../interface/Aluno";
import api from "../../services/api"; // import api configurado com Axios
import "../../styles/student_manager.css";

const StudentManager: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedAlunoId, setExpandedAlunoId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Aluno>({
    aluno_id: 0,
    nome_aluno: "",
    ra_aluno: "",
    data_nascimento: "",
    password: "",
    cursos: [],
  });

  // ✅ Carregar alunos da API ao iniciar
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get('/alunos');
        setAlunos(response.data);
      } catch (err) {
        console.error('Erro ao buscar alunos:', err);
      }
    };

    fetchAlunos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const novoAluno = {
        nome_aluno: formData.nome_aluno,
        ra_aluno: formData.ra_aluno,
        data_nascimento: formData.data_nascimento,
        password: formData.password,
      };

      const response = await api.post('/alunos', novoAluno);
      setAlunos([...alunos, response.data.aluno]); // adiciona o aluno cadastrado à lista

      // Limpa formulário e fecha modal
      setFormData({
        aluno_id: 0,
        nome_aluno: "",
        ra_aluno: "",
        data_nascimento: "",
        password: "",
        cursos: [],
      });
      setModalOpen(false);

      alert('Aluno cadastrado com sucesso!');
    } catch (err) {
      console.error('Erro ao cadastrar aluno:', err);
      alert('Erro ao cadastrar aluno.');
    }
  };

  const toggleExpand = (alunoId: number) => {
    setExpandedAlunoId(expandedAlunoId === alunoId ? null : alunoId);
  };

  return (
    <div className="studentManager">
      <div className="managerHeader">
        <h2>Alunos Cadastrados</h2>
        <button onClick={() => setModalOpen(true)}>Adicionar Aluno</button>
      </div>

      <div className="gridAlunos">
        {alunos.map((aluno) => {
          const cursosDoAluno = aluno.cursos?.map((cursoNome) =>
            mockCursos.find((c) => c.nome_curso === cursoNome)
          ).filter(Boolean) || [];

          return (
            <div key={aluno.aluno_id} className="alunoCard" onClick={() => toggleExpand(aluno.aluno_id)}>
              <div className="alunoHeader">
                <div className="alunoResumo">
                  <span><strong>{aluno.nome_aluno}</strong></span>
                  <span>RA: {aluno.ra_aluno}</span>
                  <span>{aluno.cursos?.length || 0} curso(s) com certificado</span>
                </div>
                <span className="expandIcon">▶</span>
              </div>

              {expandedAlunoId === aluno.aluno_id && (
                <div className="alunoDetalhes">
                  <table className="tabelaCursos">
                    <thead>
                      <tr>
                        <th>Curso</th>
                        <th>Horas</th>
                        <th>Certificado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cursosDoAluno.map((curso) => (
                        <tr key={curso!.id_curso}>
                          <td>{curso!.nome_curso}</td>
                          <td>{curso!.qtd_horas}</td>
                          <td>
                            <a
                              href={curso!.link_certificado}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="btnCertificado">Gerar Certificado</button>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit} className="modalForm">
            <h3>Novo Aluno</h3>
            <input
              type="text"
              placeholder="Nome do aluno"
              value={formData.nome_aluno}
              onChange={(e) => setFormData({ ...formData, nome_aluno: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="RA do aluno"
              value={formData.ra_aluno}
              onChange={(e) => setFormData({ ...formData, ra_aluno: e.target.value })}
              required
            />
            <input
              type="date"
              value={formData.data_nascimento}
              onChange={(e) => setFormData({ ...formData, data_nascimento: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
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

export default StudentManager;
