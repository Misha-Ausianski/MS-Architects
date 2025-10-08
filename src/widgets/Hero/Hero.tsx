import { Link } from 'react-router-dom';
import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import styles from './Hero.module.scss';

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
    <section className={styles.hero} data-bitrix-block="HERO_SERVICES">
      <img className={styles.bg} src={image} alt={title} />
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.crumbs}>
        <Breadcrumbs />
      </div>

      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>

        <ul className={styles.tags} aria-label="Список услуг">
          {items.map((it) => {
            const isActive = activeSlug === it.slug;
            return (
              <li key={it.id} className={styles.tagItem}>
                <Link
                  className={`${styles.tag} ${isActive ? styles.active : ''}`}
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
