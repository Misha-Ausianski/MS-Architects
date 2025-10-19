import { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
  const swiperRef = useRef<any>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // после (ре)маунта страницы форс-пересчёт размеров
  useEffect(() => {
    const s = swiperRef.current?.swiper ?? swiperRef.current;
    if (!s) return;
    const id = setTimeout(() => s.update(), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <section className={styles.hero} data-bitrix-block="HERO_SLIDER">
      <Swiper
        key={pathname} /* ремонт при возврате с другой страницы */
        ref={swiperRef}
        modules={[Autoplay, Pagination, A11y, Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        loop={items.length > 1}
        speed={700}
        watchOverflow
        observer
        observeParents
        observeSlideChildren
        updateOnWindowResize
        autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        simulateTouch
        grabCursor
        pagination={{
          clickable: true,
          renderBullet: (_i, className) =>
            `<span class="${className} ${styles.bullet}" tabindex="0" aria-current="false">
               <i class="${styles.progress}" data-progress></i>
             </span>`,
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.pagination.el = pagRef.current!;
        }}
        onAfterInit={(s) => s.update()}
        onResize={(s) => s.update()}
        onImagesReady={(s) => s.update()}
        onAutoplayTimeLeft={(_s, _time, progress) => {
          // progress: 1 → 0; нам нужно 0% → 100%
          const activeBullet = pagRef.current?.querySelector('.swiper-pagination-bullet-active');
          const bar = activeBullet?.querySelector<HTMLElement>('[data-progress]');
          if (bar) bar.style.setProperty('--p', `${(1 - progress) * 100}%`);
        }}
        onSlideChange={() => {
          // сбросить заливку у всех <i data-progress>
          pagRef.current
            ?.querySelectorAll<HTMLElement>('[data-progress]')
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
                  onClick={(e) => e.stopPropagation()}
                  className={styles.cta}
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
