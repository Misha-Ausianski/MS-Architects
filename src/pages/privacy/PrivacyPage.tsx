import { usePage } from '@entities/page/api/queries';
import Breadcrumbs from '@widgets/Breadcrumbs/Breadcrumbs';
import DownloadsList from '@widgets/DownloadsList/DownloadsList';
import styles from './PrivacyPage.module.scss';

export default function PrivacyPage() {
  const { data, isLoading } = usePage('privacy');

  return (
    <>
      <Breadcrumbs />
      <div className="container">
        {isLoading ? (
          <div className="skeleton-page" />
        ) : (
          <article className={styles.article}>
            <h1 className={styles.title}>
              {data?.title ?? 'Политика в отношении обработки персональных данных'}
            </h1>

            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: data?.content ?? '' }}
            />

            {data?.downloads?.length ? (
              <DownloadsList
                items={data.downloads as Array<{ title: string; url: string; meta?: string }>}
              />
            ) : null}
          </article>
        )}
      </div>
    </>
  );
}
