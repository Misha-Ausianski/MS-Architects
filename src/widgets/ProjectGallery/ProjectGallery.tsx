import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import style from './ProjectGallery.module.scss';
import Lightbox from '@features/gallery-lightbox/ui/Lightbox';

export function ProjectGallery({ images }: { images: string[] }) {
  const pagRef = useRef<HTMLDivElement | null>(null);
  const [src, setSrc] = useState<string | null>(null);

  return (
    <div className={style.gallery} data-bitrix-block="PROJECT_GALLERY">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        loop={images.length > 1}
        speed={600}
        watchOverflow
        observer
        observeParents
        resizeObserver
        autoHeight
        simulateTouch
        grabCursor
        autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{
          clickable: true,
          renderBullet: (_i, className) =>
            `<span class="${className} ${style.bullet}"><i class="${style.progress}"></i></span>`,
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.pagination.el = pagRef.current!;
        }}
        onAutoplayTimeLeft={(_s, _time, progress) => {
          // progress: 1 → 0; нам нужно 0% → 100%
          const active = pagRef.current?.querySelector<HTMLElement>('.swiper-pagination-bullet-active');
          if (active) active.style.setProperty('--p', `${Math.round((1 - progress) * 100)}%`);
        }}
        onSlideChange={() => {
          // сбросить заливку у всех и начать заново у активной
          pagRef.current?.querySelectorAll<HTMLElement>(`.${style.bullet}`)
            .forEach((b) => b.style.setProperty('--p', '0%'));
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
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

      <div className={style.pagination} ref={pagRef} />

      <Lightbox src={src} onClose={() => setSrc(null)} />
    </div>
  );
}
