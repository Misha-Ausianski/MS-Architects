import cn from 'clsx';
import style from './ProjectsFilterBar.module.scss';

type Option = { id: string; title: string } | string;

function normalize(o: Option) {
  if (typeof o === 'string') {
    return { id: o, title: o === 'all' ? 'Все проекты' : o };
  }
  return { id: o.id, title: o.id === 'all' ? 'Все проекты' : o.title };
}

type Props = {
  categories: Option[];
  value?: string;
  onChange: (v?: string) => void;
  className?: string;
};

export default function ProjectsFilterBar({ categories, value, onChange, className }: Props) {
  const items = categories.map(normalize);

  return (
    <div className={cn(style.root, className)} role="tablist" aria-label="Фильтр по категориям">
      {items.map(({ id, title }) => {
        const active = value ? value === id : items[0]?.id === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            className={cn(style.item, active && style.active)}
            onClick={() => onChange(id)}
            type="button"
          >
            {title}
          </button>
        );
      })}
    </div>
  );
}
