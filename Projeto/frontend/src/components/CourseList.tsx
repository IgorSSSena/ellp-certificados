import React from 'react';
import CourseCard from './CourseCard';
import styles from './CourseList.module.scss';

type Course = {
  image: string;
  title: string;
  date: string;
  status: "concluido" | "andamento";
};

const mockCourses: Course[] = [
  {
    image: 'https://picsum.photos/200/100?1',
    title: 'Programação Beck-End',
    date: '22/08/2025',
    status: 'andamento',
  },
  {
    image: 'https://picsum.photos/200/100?2',
    title: 'Programação Beck-End',
    date: '22/08/2025',
    status: 'andamento',
  },
  {
    image: 'https://picsum.photos/200/100?3',
    title: 'Programação Beck-End',
    date: '22/08/2025',
    status: 'concluido',
  },
  {
    image: 'https://picsum.photos/200/100?4',
    title: 'Programação Beck-End',
    date: '22/08/2025',
    status: 'andamento',
  },
  {
    image: 'https://picsum.photos/200/100?5',
    title: 'Programação Beck-End',
    date: '22/08/2025',
    status: 'concluido',
  },
  {
    image: 'https://picsum.photos/200/100?6',
    title: 'Programação Beck-End',
    date: '22/08/2025',
    status: 'concluido',
  },
];

const CourseList: React.FC = () => {
  return (
    <div className={styles.listContainer}>
      {mockCourses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
  );
};

export default CourseList;
