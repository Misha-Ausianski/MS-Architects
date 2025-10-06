import { useProjects } from '@entities/project/api/queries';
import { ProjectCard } from '@entities/project/ui/ProjectCard';
import s from './RelatedProjects.module.scss';

type Props = {
  serviceSlug: string;
  currentSlug?: string;
  limit?: number;
};

export function RelatedProjects({ serviceSlug, currentSlug, limit = 3 }: Props) {
  const { data } = useProjects({});
  const items = (data?.items ?? [])
    .filter(p => p.serviceSlug === serviceSlug)
    .filter(p => p.slug !== currentSlug)
    .slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section data-bitrix-block="RELATED_PROJECTS">
      <div className="container">
        <h2>Другие проекты этой категории</h2>
        <div className={s.grid}>
          {items.map(p => (
            <div key={p.id} className={s.cell}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
