import { Project } from '@entities/project/model/types';
import style from './ProjectMeta.module.scss';

export default function ProjectMeta({ project }: { project: Project }) {
  const items = [
    project.customer && { label: 'Заказчик', value: project.customer },
    project.category && { label: 'Наименование проекта', value: project.category },
    project.area_m2 && { label: 'Площадь', value: `${project.area_m2} м²` },
    project.city && { label: 'Локация', value: project.city },
    project.year && { label: 'Год создания', value: project.year },
  ].filter(Boolean) as { label: string; value: string | number }[];

  return (
    <dl className={style.meta} data-bitrix-block="PROJECT_META">
      {items.map((it, i) => (
        <div className={style.item} key={i}>
          <dt className={style.label}>{it.label}</dt>
          <dd className={style.value}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
