import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Footer, Header } from '@/shared/component';
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
import { detectDeviceInfo } from '@/feature/alert/lib/detectDeviceInfo';

import styles from './MainPage.module.css';

export default function MainPage() {
  const ua = navigator.userAgent;

  const { isMobile, platform } = detectDeviceInfo();
  console.log(isMobile);
  console.log(platform);

  return (
    <main>
      <Header className={styles.header} />
      <p>{ua}</p>
      <p>{isMobile ? '✅ 모바일 기기 맞아' : '❌ 모바일 기기 아니야'}</p>
      <p>{platform}</p>
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
