import { useEffect, useRef } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
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
  const swiperRef = useRef<SwiperClass | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderBullet = (_i: number, className: string) =>
    `<span class="${className} ${styles.bullet}" tabindex="0">
       <i class="${styles.progress}" data-progress></i>
     </span>`;

  /** Привязываем внешний контейнер и переинициализируем пагинацию */
  const attachPagination = (s: SwiperClass | null) => {
    if (!s || !pagRef.current) return;

    // гарантируем объектную форму параметров пагинации
    if (!s.params.pagination || typeof s.params.pagination === 'boolean') {
      // @ts-expect-error — Swiper допускает boolean, мы приводим к объекту
      s.params.pagination = { enabled: true };
    }

    const p = s.params.pagination as any;
    p.el = pagRef.current;
    p.clickable = true;
    p.renderBullet = renderBullet;

    // ВАЖНО: дергаем методы только когда модуль уже инициализирован
    if (!s.pagination) return;

    s.pagination.destroy?.();
    s.pagination.init?.();
    s.pagination.render?.();
    s.pagination.update?.();
  };

  // Пересборка после смены роутов/данных
  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;

    attachPagination(s);

    const id = setTimeout(() => {
      s.update();
      s.pagination?.update?.();
    }, 0);

    return () => clearTimeout(id);
  }, [pathname, items.length]);

  return (
    <section className={styles.hero} data-bitrix-block="HERO_SLIDER">
      <Swiper
        key={pathname}
        modules={[Autoplay, Pagination, A11y, Navigation]}
        // В onSwiper только сохраняем ссылку — НЕ вызываем attachPagination здесь!
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        // Гарантированная точка, где уже есть s.pagination
        onInit={(s) => {
          attachPagination(s);
        }}
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
        // Даём Swiper'у объект, чтобы модуль Pagination точно включился
        pagination={{ enabled: true, clickable: true, renderBullet }}
        onAfterInit={(s) => {
          s.update();
          s.pagination?.update?.();
        }}
        onResize={(s) => {
          s.update();
          s.pagination?.update?.();
        }}
        onImagesReady={(s) => {
          s.update();
          s.pagination?.update?.();
        }}
        onAutoplayTimeLeft={(_s, _time, progress) => {
          const bar = pagRef.current?.querySelector<HTMLElement>(
            '.swiper-pagination-bullet-active [data-progress]'
          );
          if (bar) bar.style.setProperty('--p', `${((1 - progress) * 100).toFixed(0)}%`);
        }}
        onSlideChange={() => {
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
                <Link to="/projects" onClick={(e) => e.stopPropagation()} className={styles.cta}>
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

      {/* внешний контейнер лучше оставить с классом swiper-pagination,
          чтобы применились дефолтные стили плагина */}
      <div className={`${styles.pagination} swiper-pagination`} ref={pagRef} />
    </section>
  );
}
