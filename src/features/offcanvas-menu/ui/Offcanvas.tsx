import { useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useOffcanvas } from '../model/store';
import VkIcon from '@shared/assets/vk.svg?react';
import InstagramIcon from '@shared/assets/ig.svg?react';
import styles from './Offcanvas.module.scss';

export default function Offcanvas() {
  const { isOpen, close } = useOffcanvas();

  const onOverlayMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) close();
    },
    [close]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      html.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  return (
    <div
      id="offcanvas"
      className={[styles.overlay, isOpen ? styles.open : ''].join(' ')}
      onMouseDown={onOverlayMouseDown}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Мобильное меню"
    >
      <div className={styles.content}>
        <nav className={styles.nav} onClick={close} aria-label="Навигация по сайту">
          <NavLink to="/bureau">Бюро</NavLink>
          <NavLink to="/projects">Проекты</NavLink>
          <NavLink to="/services">Услуги</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
        </nav>

        <div className={styles.socials}>
          <a
            href="https://vk.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VK"
            className={styles.socialBtn}
          >
            <VkIcon />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={styles.socialBtn}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
}