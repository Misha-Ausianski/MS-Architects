import PDFIcon from '@shared/assets/pdf.svg?react';
import styles from './DownloadsList.module.scss';

export type DownloadItem = { title: string; url: string; meta?: string };

export default function DownloadsList({ items }: { items: DownloadItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((d, i) => (
        <a key={i} className={styles.item} href={d.url} target="_blank" rel="noopener">
          <PDFIcon className={styles.icon} />
          <div className={styles.texts}>
            <div className={styles.title}>{d.title}</div>
            {d.meta && <div className={styles.meta}>{d.meta}</div>}
          </div>
        </a>
      ))}
    </div>
  );
}
