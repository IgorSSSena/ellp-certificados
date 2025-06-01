// src/pages/AdminPage.tsx
import React, { useState } from "react";
import StudentManager from "../components/admin/StudentManeger";  
import CourseManager from "../components/admin/CourseManager";
import CourseAssignment from "../components/admin/CourseAssignment";
import "../styles/admin_page.css";
// src/pages/AdminPage.tsx

const AdminPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'alunos' | 'cursos'>('alunos');

  return (
    <div className="admin-container">
      <h1>Painel do Administrador</h1>

      <div className="admin-topbar">
        <button
          className={selectedTab === 'alunos' ? 'active' : ''}
          onClick={() => setSelectedTab('alunos')}
        >
          Gerenciar Alunos
        </button>
        <button
          className={selectedTab === 'cursos' ? 'active' : ''}
          onClick={() => setSelectedTab('cursos')}
        >
          Gerenciar Cursos
        </button>
      </div>

      <div className="admin-section">
        {selectedTab === 'alunos' ? <StudentManager /> : <CourseManager />}
      </div>
    </div>
  );
};

export default AdminPage;
