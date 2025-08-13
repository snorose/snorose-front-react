import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Footer, GradientBox, Header } from '@/shared/component';
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

import styles from './MainPage.module.css';

export default function MainPage() {
  return (
    <main>
      <GradientBox type='gray'>
        자주 묻는 질문을 확인해보세요. 궁금하신 점이 해결되지 않았다면, 카카오톡
        1:1 문의 및 이메일 snorose1906@gmail.com를 통해 연락해주세요.
      </GradientBox>

      <Header className={styles.header} />
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
