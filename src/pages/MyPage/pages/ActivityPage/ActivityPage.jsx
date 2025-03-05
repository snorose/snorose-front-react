import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { useScrollRestoration } from '@/shared/hook';
import { BackAppBar, FetchLoading } from '@/shared/component';
import { ACTIVITIES } from '@/feature/my/constant';

import { Posts, PostsErrorFallback } from '@/pages/MyPage/pages/ActivityPage';

import styles from './ActivityPage.module.css';

export default function ActivityPage() {
  const { pathname } = useLocation();
  const { scrollRef, saveScrollPosition } = useScrollRestoration();

  const { title, queryKey, queryFn, hasLike, errorMessage } = ACTIVITIES.find(
    ({ path }) => path === pathname
  );

  return (
    <section className={styles.activityPage} ref={scrollRef}>
      <BackAppBar stroke='#000' />

      <div className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>{title}</h1>
        </div>

        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={PostsErrorFallback}
            >
              <Suspense fallback={<FetchLoading>불러오는 중</FetchLoading>}>
                <Posts
                  queryKey={queryKey}
                  queryFn={queryFn}
                  hasLike={hasLike}
                  errorMessage={errorMessage}
                  saveScrollPosition={saveScrollPosition}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </section>
  );
}
