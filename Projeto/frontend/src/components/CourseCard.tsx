import React from 'react';
import "../styles/course_card.css";

interface CourseCardProps {
  image: string;
  title: string;
  date: string;
  status: 'concluido' | 'andamento';
}

const CourseCard: React.FC<CourseCardProps> = ({ image, title, date, status }) => {
  const isCompleted = status === 'concluido';

  return (
    <div className="card">
      <img src={image} alt={title} className="cardImage" />
      <div className="cardContent">
        <h3>{title}</h3>
        <p>Data: {date}</p>
        <a href="#">Mais detalhes</a>
      </div>
      <div className="cardStatus">
        {isCompleted ? (
          <>
            <span className="completed">Concluído</span>
            <button className="certificateBtn">Gerar Certificado</button>
          </>
        ) : (
          <span className="inProgress">Em andamento</span>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
