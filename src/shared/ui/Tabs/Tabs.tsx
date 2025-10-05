import cls from './Tabs.module.scss';
export type TabItem = { value: string; label: string };
type Props = { items: TabItem[]; value: string; onChange: (v: string)=>void };

export default function Tabs({ items, value, onChange }: Props) {
  return (
    <div className={cls.tabs} role="tablist">
      {items.map(it => (
        <button
          key={it.value}
          type="button"
          role="tab"
          aria-selected={value === it.value}
          className={[cls.tab, value===it.value ? cls.active : ''].join(' ')}
          onClick={() => onChange(it.value)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}