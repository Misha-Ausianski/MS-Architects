import { useParams } from 'react-router-dom';
import { useService } from '@entities/service/api/queries';
import { useServices } from '@entities/service/api/queries';
import { RelatedProjects } from '@widgets/RelatedProjects/RelatedProjects';
import HeroServices from '@widgets/Hero/Hero';
import s from './ServiceDetail.module.scss';

export default function ServiceDetailPage() {
  const { slug = '' } = useParams();

  // текущая услуга
  const { data: svc, isLoading } = useService(slug);

  // список всех услуг для тегов в hero
  const { data: all } = useServices();
  const items = (all?.items ?? []).map((x) => ({ id: x.id, title: x.title, slug: x.slug }));

  if (isLoading || !svc) return <div className="skeleton-page" />;

  const heroImage =
    (svc as any).cover ||
    (svc as any).image ||
    'https://placehold.co/1600x900?text=Service+Hero';

  return (
    <>
      <HeroServices
        image={heroImage}
        title={svc.title}
        items={items}
        activeSlug={svc.slug}
      />

      <section className="section">
        <div className="container">
          <div className={s.lead}>
            {svc.description && (
              <div
                className={s.desc}
                dangerouslySetInnerHTML={{ __html: svc.description }}
              />
            )}
          </div>
        </div>
      </section>

      <RelatedProjects category={svc.title} />
    </>
  );
}
