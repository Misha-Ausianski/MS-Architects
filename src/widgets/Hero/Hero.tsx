import { Link } from 'react-router-dom';
import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import s from './Hero.module.scss';

type Item = { id: number | string; title: string; slug: string };

export default function HeroServices({
  image,
  title,
  items,
  activeSlug,
}: {
  image: string;
  title: string;
  items: Item[];
  activeSlug?: string;
}) {
  return (
    <section className={s.hero} data-bitrix-block="HERO_SERVICES">
      <img className={s.bg} src={image} alt={title} />
      <div className={s.shade} aria-hidden="true" />

      {/* хлебные крошки поверх hero */}
      <div className={s.crumbs}>
        <Breadcrumbs />
      </div>

      <div className={s.inner}>
        <h1 className={s.title}>{title}</h1>

        <ul className={s.tags} aria-label="Список услуг">
          {items.map((it) => {
            const isActive = activeSlug === it.slug;
            return (
              <li key={it.id} className={s.tagItem}>
                <Link
                  className={`${s.tag} ${isActive ? s.active : ''}`}
                  to={`/services/${it.slug}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {it.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
