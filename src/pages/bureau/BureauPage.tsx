import ClientsLogos from '@widgets/ClientsLogos/ClientsLogos';
import TabbedForm from '@widgets/TabbedForm/TabbedForm';
import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import bureauImg from '@shared/assets/bureau.jpg';
import DownloadsList from '@widgets/DownloadsList/DownloadsList';
import { usePage } from '@entities/page/api/queries';
import styles from './BureauPage.module.scss';

export default function BureauPage() {
  const { data, isLoading } = usePage('bureau');

  const advantages = [
    {
      title: 'Специализация',
      text: 'Создаём стильные и&nbsp;функциональные офисы, коворкинги и&nbsp;общественные пространства, включая эскизные, архитектурные и&nbsp;рабочие проекты.',
    },
    {
      title: 'Исследования',
      text: 'Наш отдел аналитики собирает данные для каждого проекта, обеспечивая точность<br/> и&nbsp;эффективность решений.',
    },
    {
      title: 'Качество проектов и глубина проработки',
      text: 'Детализируем каждую деталь, создавая проекты, которые легко и&nbsp;удобно реализоватьна практике.',
    },
    {
      title: 'Актуальность проектирования',
      text: 'Следим за&nbsp;трендами и&nbsp;создаём проекты, которые остаются современными долгие годы.',
    },
    {
      title: 'Доступность',
      text: 'Сочетаем научный подход, технологии и&nbsp;искусство, создавая доступные решения для всех типов клиентов.',
    },
    {
      title: 'Работаем по всей России',
      text: 'Проектируем для любых регионов&nbsp;&mdash; от&nbsp;мегаполисов до&nbsp;самых отдалённых уголков страны',
    },
  ];

  const firstAdvantagesRow = advantages.slice(0, 3);
  const secondAdvantagesRow = advantages.slice(3);

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
          <h1 className={styles.title}>Архитектурное бюро</h1>
          <div className={styles.introGrid}>
            <div className={styles.col}>
              <p className={styles.p}>
                МС&nbsp;АРХИТЕКТС&nbsp;&mdash; креативная команда архитекторов, инженеров,
                конструкторов и&nbsp;дизайнеров. Нам удалось сформировать слаженный коллектив
                единомышленников с&nbsp;высоким творческим потенциалом и&nbsp;прочными убеждениями,
                и&nbsp;серьёзным опытом разработки проектной документации. Мы&nbsp;постоянно
                совершенствуемся, стараясь не&nbsp;отставать от&nbsp;мировых тенденций
                в&nbsp;дизайне и&nbsp;проектировании.
              </p>
              <p className={styles.p}>
                Наша команда состоит исключительно из&nbsp;высококвалифицированных профессионалов
                с&nbsp;большим опытом работы, среди которых инженеры-архитекторы, конструкторы,
                визуализаторы, дизайнеры интерьеров и&nbsp;ландшафтные дизайнеры с&nbsp;высшим
                профильным образованием.
              </p>
            </div>
            <div className={styles.col}>
              <p className={styles.p}>
                В&nbsp;нашем портфолио&nbsp;Вы найдете дизайн-проекты, проекты и&nbsp;рабочую
                документацию офисов, коворкингов, торговых центров, музеев, школ и&nbsp;детских
                садов, коттеджных поселков. Также мы&nbsp;разрабатываем проекты инженерных систем
                и&nbsp;прочие разделы согласно ПП &#8470;&nbsp;87,
              </p>
              <p className={styles.p}>
                МС&nbsp;Архитектс, является партнером Центрального Научно Исследовательского
                Института Эксперементального проектирования имени Мезенцева.
              </p>
            </div>
          </div>

          {isLoading ? null : data?.downloads?.length ? (
            <div className={styles.downloadsWrap}>
              <DownloadsList
                items={data.downloads as Array<{ title: string; url: string; meta?: string }>}
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h3 className={styles.subtitle}>
            Преимущества
          </h3>
          <div className={styles.advantages}>
            <div className={styles.firstRow}>
              {firstAdvantagesRow.map((item, index) => (
                <div key={index} className={styles.card}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText} dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              ))}
            </div>

            <div className={styles.secondRow}>
              {secondAdvantagesRow.map((item, index) => (
                <div key={index} className={styles.card}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText} dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
