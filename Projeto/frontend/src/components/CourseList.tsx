import React, { useState } from "react";
import CourseCard from "./CourseCard";
import "../styles/course_list.css";
import curso1 from "../assets/curso1.jpg";
import curso2 from "../assets/curso2.jpg";

type Course = {
  title: string;
  studentName: string;
  hours: number;
  status: "concluido" | "andamento";
  certificateUrl?: string;
  imagem: string;
};

const mockCourses: Course[] = [
  {
    title: "Web Development Basics",
    studentName: "John Doe",
    hours: 40,
    status: "concluido",
    imagem: curso1,
    certificateUrl: "/certificates/web-development.pdf",
  },
  {
    title: "Advanced React",
    studentName: "John Doe",
    hours: 60,
    status: "andamento",
    imagem: curso2,
  },
  // ... outros cursos
];

const CourseList: React.FC = () => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "concluido" | "andamento"
  >("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleLayout = () => {
    setLayout((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSummaryClick = (status: "all" | "concluido" | "andamento") => {
    setFilterStatus(status);
  };

  const filteredCourses = mockCourses.filter((course) => {
    const statusMatches =
      filterStatus === "all" || course.status === filterStatus;
    const titleMatches = course.title.toLowerCase().includes(searchTerm);
    return statusMatches && titleMatches;
  });

  const totalCourses = mockCourses.length;
  const completedCourses = mockCourses.filter(
    (c) => c.status === "concluido"
  ).length;
  const inProgressCourses = mockCourses.filter(
    (c) => c.status === "andamento"
  ).length;

  return (
    <div>
      {/* Campo de busca + Layout */}
      
      <div className="pesquisaContainer">
         <div className="course-summary">
        <div
          className={`summary-card ${
            filterStatus === "all" ? "active total" : ""
          }`}
          onClick={() => handleSummaryClick("all")}
        >
          <h3>{totalCourses}</h3>
          <p>Total </p>
        </div>
        <div
          className={`summary-card ${
            filterStatus === "concluido" ? "active concluido" : ""
          }`}
          onClick={() => handleSummaryClick("concluido")}
        >
          <h3>{completedCourses}</h3>
          <p>Finalizado</p>
        </div>
        <div
          className={`summary-card ${
            filterStatus === "andamento" ? "active pendente" : ""
          }`}
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

      {/* Quadro de Resumo com clique */}
     
      
      {/* Lista ou Grid */}
      <div className={layout === "grid" ? "grid-container" : "list-container"}>
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} {...course} imagem={course.imagem} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
