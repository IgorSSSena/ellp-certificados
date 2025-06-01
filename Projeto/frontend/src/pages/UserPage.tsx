import React from "react";
import CourseList from "../components/CourseList.tsx";
import "../styles/user_page.css";
// @ts-ignore
import roboImage from "../assets/robo-livro.svg";
import powerOff from "../assets/power_icon.svg";

const UserPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <div className="userInfo">
        <p>Igor Silva Sena - 2418274</p>
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
