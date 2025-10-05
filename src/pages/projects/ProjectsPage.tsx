import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import { FilterBar } from '@features/projects-filter/ui/FilterBar';
import { useProjects } from '@entities/project/api/queries';
import { ProjectsMasonry } from '@widgets/ProjectsMasonry/ProjectsMasonry';
import { useMemo, useState } from 'react';

export default function ProjectsPage() {
  const [category, setCategory] = useState('all');
  const { data: all } = useProjects({});
  const categories = useMemo(() => Array.from(new Set((all?.items ?? []).map(p => p.category))), [all]);
  const { items } = useProjects({ category }).data ?? { items: [] };

  return (
    <>
      <Breadcrumbs />
      <div className="container">
        <h1>Проекты</h1>
        <FilterBar categories={categories} value={category} onChange={(v)=>setCategory(v)} />
        {items?.length ? <ProjectsMasonry items={items} /> : <div className="skeleton-page" />}
      </div>
    </>
  );
}
