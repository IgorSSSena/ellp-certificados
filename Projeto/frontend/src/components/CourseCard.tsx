import React from "react";
import "../styles/course_card.css";
import { FaCheckCircle, FaRegClock } from "react-icons/fa";
import api from "../services/api";


interface CourseCardProps {
  title: string;
  studentName: string;
  hours: number;
  status: "concluido" | "andamento";
  certificateUrl?: string;
  esta_certificado?: boolean;
}


const CourseCard: React.FC<CourseCardProps> = ({
  title,
  studentName,
  hours,
  status,
  esta_certificado,
}) => {
  const isCompleted = status === "concluido";

  const handleDownloadCertificate = async () => {
  try {
    const response = await api.post('/certificado/gerar-pdf', {
      nome: studentName,
      nome_curso: title,
      horas: hours,
    }, { responseType: 'blob' });

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  } catch (err) {
    console.error('Erro ao gerar certificado:', err);
    alert('Erro ao gerar certificado');
  }
};

  return (
    <div className="custom-card">
      <div className="card-header">
        <div className="card-icons">
        
        </div>
      </div>

      <div className="card-body">

        <div className="card-info">
          <span>{title}</span>
          <p>
            <strong>Duration:</strong> {hours} hours
          </p>

          <div className={`status ${isCompleted ? "completed" : "inProgress"}`}>
            <p>
              {isCompleted ? (
                <>
                  <FaCheckCircle className="status-icon completed-icon" /> Completed
                </>
              ) : (
                <>
                  <FaRegClock className="status-icon pending-icon" /> In Progress
                </>
              )}
            </p>

            <div className="bottonDownload">
              {isCompleted && (
              <a onClick={handleDownloadCertificate} download className="download-button">
                Baixar Certificado
              </a>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
