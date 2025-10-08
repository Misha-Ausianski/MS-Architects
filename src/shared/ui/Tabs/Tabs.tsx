export type TabItem = { value: string; label: string };
type Props = { items: TabItem[]; value: string; onChange: (v: string) => void };
import style from './Tabs.module.scss';

export default function Tabs({ items, value, onChange }: Props) {
  return (
    <div className={style.tabs} role="tablist">
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          role="tab"
          aria-selected={value === it.value}
          className={[style.tab, value === it.value ? style.active : ''].join(' ')}
          onClick={() => onChange(it.value)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
