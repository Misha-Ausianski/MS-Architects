import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import TabbedForm from '@widgets/TabbedForm/TabbedForm';
import styles from './ContactsPage.module.scss';

export default function ContactsPage() {
  return (
    <>
      <div className={styles.container}>
        <Breadcrumbs />
        <h1 className={styles.h1}>Контакты</h1>

        <div className={styles.row}>
          <div className={styles.left}>
            <p className={styles.phone}>
              <a href="tel:+74993467056" aria-label="Позвонить +7 499 346 70 56">
                <b>+7 499 346 70 56</b>
              </a>
            </p>
            <p className={styles.email}>
              <a href="mailto:info@msarchitects.ru">info@msarchitects.ru</a>
            </p>
            <p className={styles.address}>
              г. Москва, ул. Селезнёвская, д. 19/2
            </p>
          </div>

          <div className={styles.right}>
            <TabbedForm />
          </div>
        </div>
      </div>
    </>
  );
}
