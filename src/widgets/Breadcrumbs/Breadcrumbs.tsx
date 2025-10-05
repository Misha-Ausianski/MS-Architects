// app/widgets/Breadcrumbs/Breadcrumbs.tsx

import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  const crumbs = [
    { name: 'Главная', to: '/' },
    ...parts.map((p, i) => ({
      name: decodeURIComponent(p),
      to: '/' + parts.slice(0, i + 1).join('/'),
    })),
  ];

  return (
    <nav className={styles.bc} aria-label="breadcrumb">
      {crumbs.map((c, i) => (
        <Fragment key={c.to}>
          {i === crumbs.length - 1 ? (
            <span className={styles.crumb} aria-current="page">{c.name}</span>
          ) : (
            <Link className={styles.crumb} to={c.to}>{c.name}</Link>
          )}
          {i < crumbs.length - 1 && (
            <span className={styles.sep} aria-hidden="true">/</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
