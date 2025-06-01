import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList.tsx";
import "../styles/user_page.css";
// @ts-ignore
import roboImage from "../assets/robo-livro.svg";
import powerOff from "../assets/power_icon.svg";



const UserPage: React.FC = () => {
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");

  useEffect(() => {
    const nomeUsuario = localStorage.getItem("nomeUsuario") || "Igor Sena";
    const raUsuario = localStorage.getItem("ra") || "321323";
    setNome(nomeUsuario);
    setRa(raUsuario);
  }, []);

  return (
    <div className="pageContainer">
      <div className="userInfo">
        <p>{nome} - {ra}</p>
        <img src={powerOff} alt="Power off" />
      </div>

      <div className="containerWhite">
        <div className="topBar">
          <h1>Meus Cursos</h1>

          <div className="pesquisaContainer">
            <input
              type="text"
              placeholder="🔍 Pesquisar"
              className="searchInput"
            />
            <select className="filterSelect">
              <option>Filtros</option>
            </select>
          </div>
        </div>

        <CourseList />
      </div>
    </div>
  );
};

export default UserPage;
