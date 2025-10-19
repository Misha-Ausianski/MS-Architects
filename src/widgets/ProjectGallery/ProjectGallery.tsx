import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import style from './ProjectGallery.module.scss';
import Lightbox from '@features/gallery-lightbox/ui/Lightbox';

export function ProjectGallery({ images }: { images: string[] }) {
  const pagRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const s = swiperRef.current?.swiper ?? swiperRef.current;
    if (!s) return;
    const id = setTimeout(() => s.update(), 0);
    return () => clearTimeout(id);
  }, [images]);

  return (
    <div className={style.gallery} data-bitrix-block="PROJECT_GALLERY">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, A11y, Navigation]}
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
        pagination={{
          clickable: true,
          renderBullet: (_i, className) =>
            `<span class="${className} ${style.bullet}" tabindex="0" aria-current="false">
               <i class="${style.progress}" data-progress></i>
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
          const activeBullet = pagRef.current?.querySelector('.swiper-pagination-bullet-active');
          const bar = activeBullet?.querySelector<HTMLElement>('[data-progress]');
          if (bar) bar.style.setProperty('--p', `${(1 - progress) * 100}%`);
        }}
        onSlideChange={() => {
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

      <div className={style.pagination} ref={pagRef} />

      <Lightbox src={src} onClose={() => setSrc(null)} />
    </div>
  );
}
