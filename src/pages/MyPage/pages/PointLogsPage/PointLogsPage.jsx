import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { useAuth } from '@/shared/hook';
import { BackAppBar, FetchLoading, Icon } from '@/shared/component';

import {
  PointLogs,
  PointLogsErrorFallback,
} from '@/pages/MyPage/pages/PointLogsPage';

import styles from './PointLogsPage.module.css';

export default function PointLogsPage() {
  const { userInfo } = useAuth({
    isRequiredAuth: true,
  });

  return (
    <section className={styles.viewPointListPage}>
      <header>
        <BackAppBar stroke='#000' />
      </header>

      <div className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>보유 포인트</h1>
          <div className={styles.totalPointWrapper}>
            <Icon id='point-circle' width={32} height={32} />
            <span className={styles.totalPoint}>
              {userInfo?.balance.toLocaleString()}
            </span>
          </div>
        </div>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={PointLogsErrorFallback}
            >
              <Suspense fallback={<FetchLoading>불러오는 중</FetchLoading>}>
                <PointLogs />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </section>
  );
}
