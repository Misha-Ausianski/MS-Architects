import Portal from '@shared/lib/portal';
import styles from './Lightbox.module.scss';

export default function Lightbox({ src, onClose }: { src: string|null; onClose: ()=>void }) {
  if (!src) return null;
  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose}>
        <img className={styles.img} src={src} alt="" onClick={(e)=>e.stopPropagation()} />
        <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
      </div>
    </Portal>
  );
}
