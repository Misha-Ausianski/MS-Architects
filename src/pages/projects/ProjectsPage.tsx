import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import { useProjects } from '@entities/project/api/queries';
import { ProjectsMasonry } from '@widgets/ProjectsMasonry/ProjectsMasonry';
import { useMemo, useState } from 'react';
import ProjectsFilterBar from './ProjectsFilterBar';
import style from './ProjectPage.module.scss';

const ALL_ID = 'all';

export default function ProjectsPage() {
  const [category, setCategory] = useState<string>(ALL_ID);

  const { data: all } = useProjects({});

  const categories = useMemo(
    () => Array.from(new Set((all?.items ?? []).map((p) => p.category))),
    [all]
  );

  const categoriesWithAll = useMemo(
    () => [ALL_ID, ...categories],
    [categories]
  );

  const { data } = useProjects(category === ALL_ID ? {} : { category });
  const items = data?.items ?? [];

  return (
    <>
      <Breadcrumbs />
      <div className="container">
        <h1 className={style.title}>Проекты</h1>
        <ProjectsFilterBar
          categories={categoriesWithAll}
          value={category}
          onChange={(v) => setCategory(v ?? ALL_ID)}
        />
        {items.length ? <ProjectsMasonry items={items} /> : <div className="skeleton-page" />}
      </div>
    </>
  );
}
