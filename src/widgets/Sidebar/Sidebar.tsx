import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import Logo from '@shared/assets/logo.svg?react';
import VkIcon from '@shared/assets/vk.svg?react';
import InstagramIcon from '@shared/assets/ig.svg?react';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} data-bitrix-block="SIDEBAR">
      <div className={styles.inner}>
        <NavLink to="/">
          <Logo className={styles.logo} />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            to="/bureau"
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ''].join(' ')
            }
          >
            Бюро
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ''].join(' ')
            }
          >
            Проекты
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ''].join(' ')
            }
          >
            Услуги
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ''].join(' ')
            }
          >
            Контакты
          </NavLink>
        </nav>

        <div className={styles.bottom}>
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
    </aside>
  );
}