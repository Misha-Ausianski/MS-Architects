import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer} data-bitrix-block="FOOTER">
      <div className={styles.info}>
        <ul className={styles.columnLeft}>
          <li className={styles.number}>
            <a href="tel:+74993467056" aria-label="Позвонить +7 499 346 70 56">+7 499 346 70 56</a>
          </li>
          <li className={styles.email}>
            <a href="mailto:info@msarchitects.ru">info@msarchitects.ru</a>
          </li>
          <li className={styles.address}>
            г. Москва, ул. Селезневская, д. 19/2
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