import styles from './AdvantagesGrid.module.scss';

type Item = { title: string; text: string };

export default function AdvantagesGrid({ items }: { items: Item[] }) {
  return (
    <section className="section" data-bitrix-block="ADVANTAGES">
      <div className="container">
        <h2 className={styles.h2}>Преимущества</h2>

        <div className={styles.grid}>
          {items.map((it, i) => (
            <article key={i} className={styles.card}>
              <h3 className={styles.title}>{it.title}</h3>
              <p className={styles.text}>{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}