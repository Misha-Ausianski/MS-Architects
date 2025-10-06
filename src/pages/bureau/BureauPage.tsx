import AdvantagesGrid from '@widgets/AdvantagesGrid/AdvantagesGrid';
import ClientsLogos from '@widgets/ClientsLogos/ClientsLogos';
import TabbedForm from '@widgets/TabbedForm/TabbedForm';
import styles from './BureauPage.module.scss';
import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import bureauImg from '@shared/assets/bureau.jpg';

export default function BureauPage() {
  const advantages = [
    {
      title: 'Специализация',
      text: 'Создаём стильные и функциональные офисы, коворкинги и общественные пространства, включая эскизные, архитектурные и рабочие проекты.',
    },
    {
      title: 'Исследования',
      text: 'Отдел аналитики собирает данные для каждого проекта, обеспечивая точность и эффективность решений.',
    },
    {
      title: 'Качество проектов и глубина проработки',
      text: 'Детализируем каждую деталь, создавая проекты, которые легко и удобно реализовывать на практике.',
    },
    {
      title: 'Актуальность проектирования',
      text: 'Следим за трендами и создаём проекты, которые остаются современными долгие годы.',
    },
    {
      title: 'Доступность',
      text: 'Совмещаем научный подход, технологии и искусство, создавая доступные решения для всех типов клиентов.',
    },
    {
      title: 'Работаем по всей России',
      text: 'Проектируем для любых регионов — от мегаполисов до самых отдалённых уголков страны.',
    },
  ];

  return (
    <>
      <Breadcrumbs />

      <section className={styles.hero}>
        <img
          src={bureauImg}
          alt="MS Architects — архитектурное бюро"
          loading="eager"
          className={styles.heroImg}
        />
      </section>

      <section className="section">
        <div className="container">
          <h1 className={styles.h1}>Архитектурное бюро</h1>

          <div className={styles.introGrid}>
            <div className={styles.col}>
              <p className={styles.p}>
                МС АРХИТЕКТС — креативная команда архитекторов, инженеров, конструкторов
                и дизайнеров. Нам удалось сформировать слаженный коллектив единомышленников
                с высоким творческим потенциалом и прочными убеждениями, и серьёзным опытом
                разработки проектной документации. Мы постоянно совершенствуемся, стараясь
                не отставать от мировых тенденций в дизайне и проектировании.
              </p>
              <p className={styles.p}>
                Наша команда состоит исключительно из высококвалифицированных профессионалов
                с большим опытом работы, среди которых инженеры-архитекторы, конструкторы,
                визуализаторы, дизайнеры интерьеров и ландшафтные дизайнеры с высшим профильным
                образованием.
              </p>
            </div>
            <div className={styles.col}>
              <p className={styles.p}>
                В нашем портфолио Вы найдете дизайн-проекты, проекты и рабочую документацию офисов,
                коворкингов, торговых центров, музеев, школ и детских садов, коттеджных поселков.
                Также мы разрабатываем проекты инженерных систем и прочие разделы согласно ПП № 87,
              </p>
              <p className={styles.p}>
                МС Архитектс, является партнером Центрального Научно Исследовательского Института
                Эксперементального проектирования имени Мезенцева.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdvantagesGrid items={advantages} />

      <ClientsLogos />

      <section className="section">
        <div className="container">
          <div className={styles.formRow}>
            <h2 className={styles.h2}>Хотите у нас работать?</h2>
            <div className={styles.formWrap} data-hide-tf-head>
              <TabbedForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
