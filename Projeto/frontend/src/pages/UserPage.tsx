import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList.tsx";
import "../styles/user_page.css";
// @ts-ignore
import roboImage from "../assets/robo-livro.svg";
import powerOff from "../assets/power_icon.svg";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const UserPage: React.FC = () => {
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const navigate = useNavigate(); // ← hook do react-router-dom

  useEffect(() => {
    const nomeUsuario =
      localStorage.getItem("nomeUsuario") || "Igor Silva Sena";
    const raUsuario = localStorage.getItem("ra") || "321323";
    setNome(nomeUsuario);
    setRa(raUsuario);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Limpa tudo
    navigate("/");
  };

  return (
    <>
      <div className="userInfo">
        {" "}
        <div className="left">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          Bem vindo a ELLP - Certificados
        </div>
        <div className="right">
          <p>
            {nome} - {ra}
          </p>
          <img
            src={powerOff}
            alt="Sair"
            onClick={handleLogout}
            style={{ cursor: "pointer", width: "24px" }}
            title="Sair do sistema"
          />{" "}
        </div>
      </div>
      <div className="pageContainer">
        <div className="containerWhite">
          <div className="topBar">
            <h1>Meus Certificados</h1>
          </div>

          <CourseList />
        </div>
      </div>
    </>
  );
};

export default UserPage;
