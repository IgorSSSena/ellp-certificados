import React from "react";
import "../styles/course_card.css";
import { FaCheckCircle, FaRegClock } from "react-icons/fa";

interface CourseCardProps {
  title: string;
  studentName: string;
  hours: number;
  status: "concluido" | "andamento";
  certificateUrl?: string;
  imagem: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  studentName,
  hours,
  status,
  certificateUrl,
  imagem,
}) => {
  const isCompleted = status === "concluido";

  return (
    <div className="custom-card">
      <div className="card-header">
        <div className="card-icons">
          <span className="icon minimize"></span>
          <span className="icon close"></span>
        </div>
      </div>

      <div className="card-body">
        <img src={imagem} alt={title} className="card-image" />

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
              <a href={certificateUrl} download className="download-button">
                Download Certificate
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
