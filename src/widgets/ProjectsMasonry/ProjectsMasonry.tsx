import type { Project } from '@entities/project/model/types';
import { ProjectCard } from '@entities/project/ui/ProjectCard';
import styles from './ProjectsMasonry.module.scss';

type Props = { items: Project[] };

// Сохраняем «рисунок» только как размеры, без координат
const SIZE_PATTERN = [
  '10x1','6x1','4x2','6x1',
  '6x1','4x1','4x1','6x1',
  '4x2','6x1','6x1','10x1'
] as const;

export function ProjectsMasonry({ items }: Props) {
  const list = items ?? [];
  return (
    <div className={styles.grid} data-bitrix-block="PROJECTS_GRID">
      {list.map((p, i) => {
        const size = SIZE_PATTERN[i % SIZE_PATTERN.length];
        const sizeCls = styles[`size-${size}`] || '';
        return (
          <div className={`${styles.card} ${sizeCls}`} key={p.id}>
            <ProjectCard project={p} />
          </div>
        );
      })}
    </div>
  );
}
