import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

const Home = lazy(() => import('@pages/home'));
const Bureau = lazy(() => import('@pages/bureau'));
const Projects = lazy(() => import('@pages/projects'));
const ProjectDetail = lazy(() => import('@pages/project-detail'));
const Services = lazy(() => import('@pages/services'));
const ServiceDetail = lazy(() => import('@pages/service-detail'));
const Contacts = lazy(() => import('@pages/contacts'));
const Privacy = lazy(() => import('@pages/privacy'));
const NotFound = lazy(() => import('@pages/not-found/NotFoundPage'));

const withSuspense = (el: JSX.Element) => (
  <Suspense fallback={<div className="skeleton-page" />}>{el}</Suspense>
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: withSuspense(<Home />) },
      { path: '/bureau', element: withSuspense(<Bureau />) },
      { path: '/projects', element: withSuspense(<Projects />) },
      { path: '/projects/:slug', element: withSuspense(<ProjectDetail />) },
      { path: '/services', element: withSuspense(<Services />) },
      { path: '/services/:slug', element: withSuspense(<ServiceDetail />) },
      { path: '/contacts', element: withSuspense(<Contacts />) },
      { path: '/privacy', element: withSuspense(<Privacy />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
]);
