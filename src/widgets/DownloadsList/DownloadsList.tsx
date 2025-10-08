import PDFIcon from '@shared/assets/pdf.svg?react';
import styles from './DownloadsList.module.scss';

export type DownloadItem = { title: string; url: string; size?: string };

export default function DownloadsList({ items }: { items: DownloadItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((d, i) => (
        <a key={i} className={styles.item} href={d.url} target="_blank" rel="noopener">
          <PDFIcon className={styles.icon} />
          <div className={styles.texts}>
            <div className={styles.title}>
              {d.title}
            </div>
            <div className={styles.size}>
              Размер файла – {d.size} мб
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
