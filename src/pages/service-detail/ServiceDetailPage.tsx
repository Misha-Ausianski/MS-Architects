import { useParams } from 'react-router-dom';
import { useService, useServices } from '@entities/service/api/queries';
import { RelatedProjects } from '@widgets/RelatedProjects/RelatedProjects';
import HeroServices from '@widgets/Hero/Hero';
import style from './ServiceDetail.module.scss';

const BENEFITS: { title: string; text: string }[] = [
  {
    title: 'Опытные, высококвалифицированные специалисты.',
    text: '10 лет - средний стаж проектирования специалистов компании.',
  },
  {
    title: 'Высокое качество проектной документации',
    text: 'Наши проекты проходят экспертизу в 100% случаев.',
  },
  {
    title: 'Высокоэффективные ТЭП',
    text: 'Добиваемся планировочных решений, которые обеспечивают максимальный эффект от вложений заказчика. ',
  },
  {
    title: 'Гибкий график оплаты наших услуг',
    text: 'Вы всегда можете предложить свой вариант порядка оплаты.',
  },
  {
    title: 'Короткие сроки выполнения работ',
    text: 'Благодаря наличию в штате сотрудников всех специальностей и высокому уровню профессионализма.',
  },
  {
    title: 'Работаем по всей России',
    text: 'Проектируем для любых регионов — от мегаполисов до самых отдалённых уголков страны',
  },
];

export default function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const { data: svc, isLoading } = useService(slug);

  const { data: all } = useServices();
  const items = (all?.items ?? []).map((x) => ({ id: x.id, title: x.title, slug: x.slug }));

  if (isLoading || !svc) return <div className="skeleton-page" />;

  const heroImage = svc.cover || 'https://placehold.co/1600x900?text=Service+Hero';

  return (
    <>
      <HeroServices image={heroImage} title={svc.title} items={items} activeSlug={svc.slug} />

      <div className={style.inner}>
        {svc.description && (
          <h2 className={style.title} dangerouslySetInnerHTML={{ __html: svc.description }} />
        )}

        <div className={style.text}>
          <div className={style.col}>
            {svc.intro.left.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
          <div className={style.col}>
            {svc.intro.right.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
        <div className={style.benefits}>
          <h3 className={style.benefitsTitle}>
            Почему многие крупные компании доверили проектирование зданий нам:
          </h3>
          <ul className={style.benefitsGrid}>
            {BENEFITS.map((b, i) => (
              <li key={i} className={style.card}>
                <div className={style.benefitHead}>{b.title}</div>
                <div className={style.benefitText}>{b.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RelatedProjects serviceSlug={svc.slug} currentSlug={svc.slug} limit={3} />
    </>
  );
}
