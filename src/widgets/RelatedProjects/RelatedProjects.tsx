import { useProjects } from '@entities/project/api/queries';
import { ProjectCard } from '@entities/project/ui/ProjectCard';
import s from './RelatedProjects.module.scss';

export function RelatedProjects({ category, currentSlug }: { category?: string; currentSlug?: string }) {
  const { data } = useProjects({});
  const items = (data?.items || [])
    .filter(p => (category ? p.category === category : true))
    .filter(p => p.slug !== currentSlug)
    .slice(0, 9); // запас по строкам

  if (items.length === 0) return null;

  return (
    <section className="section" data-bitrix-block="RELATED_PROJECTS">
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
