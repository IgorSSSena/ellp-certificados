import React from 'react';
import styles from "./CourseCard.module.scss";

interface CourseCardProps {
  image: string;
  title: string;
  date: string;
  status: 'concluido' | 'andamento';
}

const CourseCard: React.FC<CourseCardProps> = ({ image, title, date, status }) => {
  const isCompleted = status === 'concluido';

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>Data: {date}</p>
        <a href="#">Mais detalhes</a>
      </div>
      <div className={styles.cardStatus}>
        {isCompleted ? (
          <>
            <span className={styles.completed}>Concluído</span>
            <button className={styles.certificateBtn}>Gerar Certificado</button>
          </>
        ) : (
          <span className={styles.inProgress}>Em andamento</span>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
