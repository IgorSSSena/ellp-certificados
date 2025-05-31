import React from "react";
import CourseList from "../components/CourseList.tsx";
import styles from "./UserPage.module.scss"
// @ts-ignore
import roboImage from "../assets/robo-livro.svg";
import powerOff from "../assets/power_icon.svg";

const UserPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      {" "}
      <div className={styles.userInfo}>
       <p> Igor Silva Sena - 2418274</p>
        <img src={powerOff} alt="Power off" />
      </div>
     <div className={styles.containerWhite}>
       <div className={styles.topBar}>
        <h1>Meus Cursos</h1>

        <div className={styles.pesquisaContainer}>
          <input
            type="text"
            placeholder="🔍 Pesquisar"
            className={styles.searchInput}
          />
          <select className={styles.filterSelect}>
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
