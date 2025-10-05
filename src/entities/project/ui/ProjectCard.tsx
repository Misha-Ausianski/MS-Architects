import { Link } from 'react-router-dom';
import ArrowIcon from '@shared/assets/arrow_right.svg?react';
import type { Project } from '@entities/project/model/types';
import styles from './ProjectCard.module.scss';

export function ProjectCard({ project }: { project: Project }) {
  const img = (project as any)?.cover

  return (
    <Link to={`/projects/${project.slug}`} className={styles.card} aria-label={project.title}>
      <div className={styles.media}>
        <img src={img} alt={project.title} loading="lazy" />
      </div>

      <div className={styles.overlay}>
        <h3 className={styles.title}>{project.title}</h3>
        <div className={styles.bottom}>
          <span className={styles.category}>{project.category}</span>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
    </Link>
  );
}
