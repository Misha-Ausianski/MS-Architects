import Tabs, { TabItem } from '@shared/ui/Tabs/Tabs';

export function FilterBar({ categories, value, onChange }: { categories: string[]; value: string; onChange: (v: string)=>void }) {
  const items: TabItem[] = [{ value: 'all', label: 'Все' }, ...categories.map(c => ({ value: c, label: c }))];
  return <Tabs items={items} value={value} onChange={onChange} />;
}
