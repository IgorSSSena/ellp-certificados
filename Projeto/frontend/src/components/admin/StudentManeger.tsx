import React, { useState, useEffect } from "react";
import { mockCursos } from "./mockData";
import { Aluno } from "../../interface/Aluno";
import api from "../../services/api";
import "../../styles/student_manager.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentManager: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
      if (editMode) {
        // ✅ Editar aluno existente
        const dadosAtualizados: any = {
          nome_aluno: formData.nome_aluno,
          data_nascimento: formData.data_nascimento,
        };
        
        if (formData.password) {
            dadosAtualizados.password = formData.password;
        }

        const response = await api.put(`/alunos/${formData.aluno_id}`, dadosAtualizados);

        setAlunos(alunos.map((a) =>
          a.aluno_id === formData.aluno_id ? response.data.aluno : a
        ));

        alert('Aluno atualizado com sucesso!');
      } else {
        // ✅ Cadastrar novo aluno
        const novoAluno = {
          nome_aluno: formData.nome_aluno,
          ra_aluno: formData.ra_aluno,
          data_nascimento: formData.data_nascimento,
          password: formData.password,
        };

        const response = await api.post('/alunos', novoAluno);
        setAlunos([...alunos, response.data.aluno]);

        alert('Aluno cadastrado com sucesso!');
      }

      // Limpa formulário e fecha modal
      setFormData({
        aluno_id: 0,
        nome_aluno: "",
        ra_aluno: "",
        data_nascimento: "",
        password: "",
        cursos: [],
      });
      setEditMode(false);
      setModalOpen(false);
    } catch (err) {
      console.error('Erro ao salvar aluno:', err);
      alert('Erro ao salvar aluno.');
    }
  };

  const toggleExpand = (alunoId: number) => {
    setExpandedAlunoId(expandedAlunoId === alunoId ? null : alunoId);
  };

  const handleEdit = (aluno: Aluno) => {
    setFormData({
      ...aluno,
      password: "",
      cursos: [], // manter cursos vazio se não for editar aqui
    });
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = async (alunoId: number) => {
    if (window.confirm('Tem certeza que deseja remover este aluno?')) {
      try {
        await api.delete(`/alunos/${alunoId}`);
        setAlunos(alunos.filter((a) => a.aluno_id !== alunoId));
        alert('Aluno removido com sucesso!');
      } catch (err) {
        console.error('Erro ao remover aluno:', err);
        alert('Erro ao remover aluno.');
      }
    }
  };

  return (
    <div className="studentManager">
      <div className="managerHeader">
        <h2>Alunos Cadastrados</h2>
        <button onClick={() => {
            setFormData({
              aluno_id: 0,
              nome_aluno: "",
              ra_aluno: "",
              data_nascimento: "",
              password: "",
              cursos: [],
            });
            setModalOpen(true);
            setEditMode(false);
          }}>
          Adicionar Aluno
        </button>
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

                <div className="alunoActions">
                  <EditIcon  onClick={(e) => { e.stopPropagation(); handleEdit(aluno); }}/>
                  <DeleteIcon  onClick={(e) => { e.stopPropagation(); handleDelete(aluno.aluno_id); }}/>
                  {/* <span className="expandIcon">▶</span> */}
                </div>
              </div>

             
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit} className="modalForm">
            <h3>{editMode ? "Editar Aluno" : "Novo Aluno"}</h3>
            <input
              type="text"
              placeholder="Nome do  "
              value={formData.nome_aluno}
              onChange={(e) => setFormData({ ...formData, nome_aluno: e.target.value })}
              required
            />
            {!editMode && (
              <input
                type="text"
                placeholder="RA do aluno"
                value={formData.ra_aluno}
                onChange={(e) => setFormData({ ...formData, ra_aluno: e.target.value })}
                required
              />
            )}
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
              required={!editMode}
            />
            <button type="submit">{editMode ? "Salvar alterações" : "Cadastrar"}</button>
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
