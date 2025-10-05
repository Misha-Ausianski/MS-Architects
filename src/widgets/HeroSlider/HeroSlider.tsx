import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Button from '@shared/ui/Button/Button';
import styles from './HeroSlider.module.scss';

type Item = {
  slug: string;
  cover: string;
  category?: string;
  title: string;
  excerpt?: string;
};

export default function HeroSlider({ items }: { items: Item[] }) {
  const pagRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  return (
    <section className={styles.hero} data-bitrix-block="HERO_SLIDER">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        loop={items.length > 1}
        speed={700}
        watchOverflow
        observer
        observeParents
        resizeObserver
        autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        simulateTouch
        grabCursor
        pagination={{
          clickable: true,
          renderBullet: (_i, className) =>
            `<span class="${className} ${styles.bullet}"><i class="${styles.progress}"></i></span>`,
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.pagination.el = pagRef.current!;
        }}
        onAutoplayTimeLeft={(_s, _time, progress) => {
          // progress идёт от 1 → 0, нам нужно 0% → 100%
          const active = pagRef.current?.querySelector<HTMLElement>('.swiper-pagination-bullet-active');
          if (active) active.style.setProperty('--p', `${Math.round((1 - progress) * 100)}%`);
        }}
        onSlideChange={() => {
          pagRef.current?.querySelectorAll<HTMLElement>(`.${styles.bullet}`)
            .forEach((b) => b.style.setProperty('--p', '0%'));
        }}
      >
        {items.map((it) => (
          <SwiperSlide key={it.slug}>
            <div
              className={styles.slide}
              onClick={() => navigate(`/projects/${it.slug}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/projects/${it.slug}`);
                }
              }}
            >
              <img className={styles.bg} src={it.cover} alt={it.title} />

              <div className={styles.inner}>
                {it.category && <span className={styles.tag}>{it.category}</span>}
                <h1 className={styles.title}>{it.title}</h1>
                {it.excerpt && <p className={styles.text}>{it.excerpt}</p>}

                <Link
                  to="/projects"
                  onClick={(e) => e.stopPropagation()} // оставляем, чтобы не срабатывал клик по слайду
                  className={styles.cta}              // класс не обязателен, но удобно стилизовать
                >
                  <Button className={styles.button}>
                    Смотреть все
                    <svg width="8" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.75 7 1.5 13.25l-.875-.875L6 7 .625 1.625 1.5.75 7.75 7z" fill="#fff" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.pagination} ref={pagRef} />
    </section>
  );
}