import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import "../styles/course_list.css";
import api from "../services/api";

type Course = {
  id_curso: number;
  nome_curso: string;
  qtd_horas: number;
  link_certificado?: string;
};

const CourseList: React.FC = () => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<"all" | "concluido" | "andamento">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);

  // Buscar cursos do aluno logado ao montar o componente
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/cursos/aluno");
        setCourses(response.data);
      } catch (error) {
        console.error("Erro ao buscar cursos do aluno:", error);
      }
    };

    fetchCourses();
  }, []);

  const toggleLayout = () => {
    setLayout((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSummaryClick = (status: "all" | "concluido" | "andamento") => {
    setFilterStatus(status);
  };

  // Filtragem por título apenas, pois status não vem do backend
  const filteredCourses = courses.filter((course) => {
    const titleMatches = course.nome_curso.toLowerCase().includes(searchTerm);
    return titleMatches;
  });

  const totalCourses = courses.length;
  const completedCourses = 0; // Ajuste futuramente se backend retornar status
  const inProgressCourses = 0;

  return (
    <div>
      {/* Campo de busca + Layout */}
      <div className="pesquisaContainer">
        <div className="course-summary">
          <div
            className={`summary-card ${filterStatus === "all" ? "active total" : ""}`}
            onClick={() => handleSummaryClick("all")}
          >
            <h3>{totalCourses}</h3>
            <p>Total</p>
          </div>
          <div
            className={`summary-card ${filterStatus === "concluido" ? "active concluido" : ""}`}
            onClick={() => handleSummaryClick("concluido")}
          >
            <h3>{completedCourses}</h3>
            <p>Finalizado</p>
          </div>
          <div
            className={`summary-card ${filterStatus === "andamento" ? "active pendente" : ""}`}
            onClick={() => handleSummaryClick("andamento")}
          >
            <h3>{inProgressCourses}</h3>
            <p>Em Andamento</p>
          </div>
        </div>

        <div className="right">
          <input
            type="text"
            placeholder="🔍 Pesquisar por curso"
            className="searchInput"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <button onClick={toggleLayout} className="layout-toggle-btn">
            {layout === "grid" ? "Lista" : "Grade"}
          </button>
        </div>
      </div>

      {/* Lista ou Grid */}
      <div className={layout === "grid" ? "grid-container" : "list-container"}>
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id_curso}
            title={course.nome_curso}
            studentName="Aluno" // Valor fixo ou ajuste futuro
            hours={course.qtd_horas}
            status="concluido" // Valor fixo, ajuste se backend enviar status real
            certificateUrl={course.link_certificado}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
