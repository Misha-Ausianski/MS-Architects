import { NavLink, Outlet, useMatches } from 'react-router-dom';
import Sidebar from '@widgets/Sidebar/Sidebar';
import Footer from '@widgets/Footer/Footer';
import Offcanvas from '@features/offcanvas-menu/ui/Offcanvas';
import ScrollToTop from './ScrollToTop';
import { useOffcanvas } from '@features/offcanvas-menu/model/store';
import Logo from '@shared/assets/headerLogo.svg?react';
import BurgerIcon from '@shared/assets/Burger.svg?react';
import CloseIcon from '@shared/assets/Close.svg?react';
import styles from './MainLayout.module.scss';

export default function MainLayout() {
  const { isOpen, toggle } = useOffcanvas();
  const matches = useMatches();

  const hideFooter = matches.some((m) => m.handle?.hideFooter);

  return (
    <div className={styles.layout}>
      <ScrollToTop />
      <div className={styles.container}>
        <Sidebar />

        <main className={styles.main}>
          <div className={styles.header} role="banner">
            <NavLink to="/" aria-label="Домой" className={styles.headerLogoWrap}>
              <Logo className={styles.headerLogo}/>
            </NavLink>

            <button
              className={styles.iconBtn}
              aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isOpen}
              aria-controls="offcanvas"
              type="button"
              onClick={toggle}
            >
              {isOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>

          <div className={styles.content}>
            <Outlet />
            {!hideFooter && <Footer />}
          </div>
        </main>

        <Offcanvas />
      </div>
    </div>
  );
}
