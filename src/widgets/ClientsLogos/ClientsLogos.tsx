import styles from './ClientsLogos.module.scss';

type Props = { logos?: string[] };

export default function ClientsLogos({ logos }: Props) {
  const imgs = Array.from({ length: 12 }, (_, i) => `https://placehold.co/140x60?text=Logo+${i + 1}`);

  const rows = [0, 1, 2, 3];

  return (
    <section className="section" data-bitrix-block="CLIENTS">
      <div className={styles.container}>
        <h2 className={styles.title}>
          Наши клиенты
        </h2>

        <div className={styles.wrap}>
          {rows.map((r) => (
            <div
              key={r}
              className={`${styles.row} ${r % 2 ? styles.right : styles.left} ${r > 1 ? styles.mobileOnly : ''}`}
            >
              <div
                className={styles.marquee}
                style={
                  {
                    // разная скорость по рядам
                    ['--duration' as any]: r === 0 ? '100s' : r === 1 ? '100s' : r === 2 ? '100s' : '100s',
                  } as React.CSSProperties
                }
              >
                {/* полоса #1 */}
                <ul className={styles.content}>
                  {imgs.map((src, i) => (
                    <li key={`a-${r}-${i}`} className={styles.item}>
                      <img src={src} alt={`Logo ${i + 1}`} loading="lazy" />
                    </li>
                  ))}
                </ul>
                {/* полоса #2 (клон) */}
                <ul className={styles.content} aria-hidden="true">
                  {imgs.map((src, i) => (
                    <li key={`b-${r}-${i}`} className={styles.item}>
                      <img src={src} alt="" loading="lazy" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
