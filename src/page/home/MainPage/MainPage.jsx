import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  Carousel,
  CarouselErrorFallback,
  CarouselSkeleton,
  PopUp,
  HomeBesookt,
  HomeBesooktErrorFallback,
  HomeBesooktSkeleton,
  HomeCard,
  HomeCardErrorFallback,
  HomeCardSkeleton,
  HomeCommunity,
  ListHeader,
} from '@/feature/home/component';
import { Footer, Header } from '@/shared/component';

import styles from './MainPage.module.css';
import useDeviceInfo from '../../../feature/alert/hook/userDeviceInfo';

export default function MainPage() {
  const { isMobile, isAndroid, isIOS } = useDeviceInfo();
  const ua = navigator.userAgent;
  return (
    <main>
      <Header className={styles.header} />
      <p>{ua}</p>
      <p>모바일 기기인가요? {isMobile ? '✅ 예' : '❌ 아니요'}</p>
      <p>안드로이드인가요? {isAndroid ? '✅ 예' : '❌ 아니요'}</p>
      <p>iOS인가요? {isIOS ? '✅ 예' : '❌ 아니요'}</p>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={CarouselErrorFallback}
          >
            <Suspense fallback={<CarouselSkeleton />}>
              <Carousel className={styles.carousel} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={HomeCardErrorFallback}
          >
            <Suspense fallback={<HomeCardSkeleton />}>
              <HomeCard />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <ListHeader to='/board' title='커뮤니티' />
      <HomeCommunity className={styles.community} />

      <ListHeader to='/board/besookt' title='베숙트' />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={HomeBesooktErrorFallback}
          >
            <Suspense fallback={<HomeBesooktSkeleton />}>
              <HomeBesookt />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <Footer />
      <PopUp />
    </main>
  );
}
