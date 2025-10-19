import React, { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const parts = pathname.split('/').filter(Boolean);

  const crumbs = [
    { name: 'Главная', to: '/' },
    ...parts.map((p, i) => ({
      name: decodeURIComponent(p),
      to: '/' + parts.slice(0, i + 1).join('/'),
    })),
  ];

  const isProjectDetail = pathname.startsWith('/projects/') && parts.length > 1;

  return (
    <nav className={styles.bc} aria-label="breadcrumb">
      {isProjectDetail && (
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate('/projects')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.25 10L12.5 16.25L13.375 15.375L8 10L13.375 4.625L12.5 3.75L6.25 10Z" fill="#222222"/>
          </svg>
          Назад к проектам
        </button>
      )}
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
