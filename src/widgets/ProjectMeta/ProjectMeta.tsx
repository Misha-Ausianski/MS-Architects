import { Project } from '@entities/project/model/types';
import s from './ProjectMeta.module.scss';

export default function ProjectMeta({ project }: { project: Project }) {
  const items = [
    project.year && { label: 'Год', value: project.year },
    project.city && { label: 'Город', value: project.city },
    project.area_m2 && { label: 'Площадь', value: `${project.area_m2} м²` },
    project.category && { label: 'Категория', value: project.category },
  ].filter(Boolean) as { label: string; value: string | number }[];

  return (
    <dl className={s.meta} data-bitrix-block="PROJECT_META">
      {items.map((it, i) => (
        <div className={s.item} key={i}>
          <dt className={s.term}>{it.label}</dt>
          <dd className={s.def}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
