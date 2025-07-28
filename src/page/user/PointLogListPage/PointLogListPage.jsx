import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { useAuth } from '@/shared/hook';
import { BackAppBar, FetchLoading, Icon } from '@/shared/component';

import {
  PointLogList,
  PointLogListErrorFallback,
} from '@/feature/my/component';

import styles from './PointLogListPage.module.css';

export default function PointLogListPage() {
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
            <Icon id='point-circle' width={22} height={22} />
            <span className={styles.totalPoint}>
              {userInfo?.balance.toLocaleString()}
            </span>
          </div>
        </div>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={PointLogListErrorFallback}
            >
              <Suspense fallback={<FetchLoading>불러오는 중</FetchLoading>}>
                <PointLogList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </section>
  );
}
