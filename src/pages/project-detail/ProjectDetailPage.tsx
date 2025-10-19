import { useParams } from 'react-router-dom';
import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import { useProject } from '@entities/project/api/queries';
import { ProjectGallery } from '@widgets/ProjectGallery/ProjectGallery';
import ProjectMeta from '@widgets/ProjectMeta/ProjectMeta';
import { RelatedProjects } from '@widgets/RelatedProjects/RelatedProjects';
import style from './ProjectDetail.module.scss';

export default function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const { data: project, isLoading } = useProject(slug);
  if (isLoading || !project) return <div className="skeleton-page" />;

  return (
    <>
      <Breadcrumbs />
      <ProjectGallery images={project.gallery} />
      <div className="section">
        <div className="container">
          <div className={style.head}>
            <h1 className={style.title}>{project.title}</h1>
            <div className={style.category}>
              {project.category}
            </div>
          </div>

          <div className={style.row}>
            <aside className={style.projectMeta}>
              <ProjectMeta project={project} />
            </aside>
            <article className={style.content}>
              {project.content ? (
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              ) : (
                <p>{project.excerpt}</p>
              )}
            </article>
          </div>
        </div>
      </div>

      <RelatedProjects serviceSlug={project.serviceSlug} currentSlug={project.slug} limit={3} />
    </>
  );
}
