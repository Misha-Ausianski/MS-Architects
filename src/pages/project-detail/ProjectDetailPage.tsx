import { useParams } from 'react-router-dom';
import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import { useProject } from '@entities/project/api/queries';
import { ProjectGallery } from '@widgets/ProjectGallery/ProjectGallery';
import ProjectMeta from '@widgets/ProjectMeta/ProjectMeta';
import { RelatedProjects } from '@widgets/RelatedProjects/RelatedProjects';
import s from './ProjectDetail.module.scss';

export default function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const { data: p, isLoading } = useProject(slug);
  if (isLoading || !p) return <div className="skeleton-page" />;

  return (
    <>
      <Breadcrumbs />

      <ProjectGallery images={p.gallery} />

      <div className="container">     

        <h1 className={s.title}>{p.title}</h1>

        <div className={s.row}>
          <aside className={s.metaCol}>
            <ProjectMeta project={p} />
          </aside>

          <article className={s.content}>
            {p.content
              ? <div dangerouslySetInnerHTML={{ __html: p.content }} />
              : <p>{p.excerpt}</p>}
          </article>

        </div>
        
      </div>

      <RelatedProjects category={p.category} currentSlug={p.slug} />
    </>
  );
}
