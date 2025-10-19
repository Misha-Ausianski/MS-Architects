import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import style from './ProjectGallery.module.scss';
import Lightbox from '@features/gallery-lightbox/ui/Lightbox';

export function ProjectGallery({ images }: { images: string[] }) {
  const pagRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [src, setSrc] = useState<string | null>(null);

  const renderBullet = (_i: number, className: string) =>
    `<span class="${className} ${style.bullet}" tabindex="0">
       <i class="${style.progress}" data-progress></i>
     </span>`;

  /** Привязываем внешний контейнер и переинициализируем пагинацию */
  const attachPagination = (s: SwiperClass | null) => {
    if (!s || !pagRef.current) return;

    // Гарантируем объектную форму параметров пагинации
    if (!s.params.pagination || typeof s.params.pagination === 'boolean') {
      // @ts-expect-error: приводим boolean к объекту
      s.params.pagination = { enabled: true };
    }

    const p = s.params.pagination as any;
    p.el = pagRef.current;
    p.clickable = true;
    p.renderBullet = renderBullet;

    // Методы доступны только после инициализации модуля
    if (!s.pagination) return;

    s.pagination.destroy?.();
    s.pagination.init?.();
    s.pagination.render?.();
    s.pagination.update?.();
  };

  // Пересборка после изменения количества картинок
  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;

    attachPagination(s);

    const id = setTimeout(() => {
      s.update();
      s.pagination?.update?.();
    }, 0);

    return () => clearTimeout(id);
  }, [images.length]);

  return (
    <div className={style.gallery} data-bitrix-block="PROJECT_GALLERY">
      <Swiper
        modules={[Autoplay, Pagination, A11y, Navigation]}
        // В onSwiper только сохраняем ссылку на инстанс
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        // Первая корректная точка для привязки внешней пагинации
        onInit={(s) => {
          attachPagination(s);
        }}
        slidesPerView="auto"
        spaceBetween={20}
        loop={images.length > 1}
        speed={600}
        watchOverflow
        observer
        observeParents
        observeSlideChildren
        updateOnWindowResize
        autoHeight
        simulateTouch
        grabCursor
        autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        // Даём объект, чтобы модуль Pagination точно включился до init
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
          // progress: 1 → 0; нам нужно 0% → 100%
          const bar = pagRef.current?.querySelector<HTMLElement>(
            '.swiper-pagination-bullet-active [data-progress]'
          );
          if (bar) bar.style.setProperty('--p', `${((1 - progress) * 100).toFixed(0)}%`);
        }}
        onSlideChange={() => {
          // Сбросить заливку у всех <i data-progress>
          pagRef.current
            ?.querySelectorAll<HTMLElement>('[data-progress]')
            .forEach((b) => b.style.setProperty('--p', '0%'));
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} style={{ width: 'auto' }}>
            <button
              className={style.slide}
              onClick={() => setSrc(img)}
              aria-label="Открыть изображение"
            >
              <img className={style.img} src={img} alt="" loading="lazy" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* внешний контейнер пагинации — добавляем базовый класс Swiper */}
      <div className={`${style.pagination} swiper-pagination`} ref={pagRef} />

      <Lightbox src={src} onClose={() => setSrc(null)} />
    </div>
  );
}
