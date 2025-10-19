import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer} data-bitrix-block="FOOTER">
      <div className={styles.info}>
        <ul className={styles.columnLeft}>
          <li className={styles.number}>
            <a href="tel:+74993467056" aria-label="Позвонить +7 499 346 70 56">
              +7 499 346 70 56
            </a>
          </li>
          <li className={styles.email}>
            <a href="mailto:info@msarchitects.ru">info@msarchitects.ru</a>
          </li>
          <li className={styles.address}>г. Москва, ул. Селезневская, д. 19/2</li>
          <li className={styles.social}>
            <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M26.875 22.166h-3.066c-1.16 0-1.509-.923-3.587-2.965-1.816-1.719-2.584-1.932-3.043-1.932-.635 0-.809.171-.809 1.03v2.707c0 .732-.242 1.16-2.19 1.16a12.113 12.113 0 0 1-5.347-1.644 11.857 11.857 0 0 1-3.996-3.856A23.826 23.826 0 0 1 0 6.696c0-.452.175-.86 1.05-.86h3.064c.787 0 1.07.344 1.38 1.14 1.487 4.297 4.025 8.036 5.055 8.036.395 0 .567-.172.567-1.139V9.446c-.13-2.02-1.223-2.19-1.223-2.92a.738.738 0 0 1 .25-.502.765.765 0 0 1 .536-.189h4.815c.659 0 .876.322.876 1.095v5.976c0 .645.282.859.481.859.395 0 .699-.214 1.423-.923a24.716 24.716 0 0 0 3.764-6.148c.097-.266.28-.495.52-.65.241-.154.527-.227.814-.207h3.065c.919 0 1.114.45.919 1.095a37.443 37.443 0 0 1-4.114 6.941c-.33.495-.462.752 0 1.333.304.45 1.378 1.332 2.1 2.17a13.4 13.4 0 0 1 2.582 3.522c.263.839-.174 1.268-1.05 1.268z"
                fill="#fff"
              />
            </svg>
            <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.999 10.209a3.792 3.792 0 1 0 0 7.583 3.792 3.792 0 0 0 0-7.584z"
                fill="#fff"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.9 3.596c4.055-.45 8.148-.45 12.203 0 2.215.247 4.002 1.991 4.262 4.215.48 4.112.48 8.266 0 12.378-.26 2.224-2.046 3.968-4.26 4.217-4.057.449-8.15.449-12.205 0-2.216-.249-4.002-1.993-4.262-4.216a53.316 53.316 0 0 1 0-12.38c.26-2.223 2.046-3.967 4.262-4.214zM19.835 7a1.167 1.167 0 1 0 0 2.334 1.167 1.167 0 0 0 0-2.334zM8.46 14a5.542 5.542 0 1 1 11.083 0A5.542 5.542 0 0 1 8.46 14z"
                fill="#fff"
              />
            </svg>
          </li>
        </ul>

        <ul className={styles.navs}>
          <li className={styles.nav}>
            <NavLink to="/bureau">Бюро</NavLink>
          </li>
          <li className={styles.nav}>
            <NavLink to="/projects">Проекты</NavLink>
          </li>
          <li className={styles.nav}>
            <NavLink to="/services">Услуги</NavLink>
          </li>
        </ul>

        <ul className={styles.docs}>
          <li className={styles.doc}>
            <a href="#">Скачать презентацию</a>
          </li>
          <li className={styles.doc}>
            <a href="#">Охрана труда рабочих мест</a>
          </li>
          <li className={styles.doc}>
            <a href="#">СРО</a>
          </li>
        </ul>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} MS Architects</p>
        <NavLink to="/privacy">Политика конфиденциальности</NavLink>
        <a href="#">Разработка сайта</a>
      </div>
    </footer>
  );
}
