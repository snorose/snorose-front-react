import {
  requestPermission,
  onMessageListener,
} from '@/firebase/firebase-messaging';
import NotificationCard from '@/components/NotificationCard';

import { Suspense, useState, useEffect } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { Footer, Header } from '@/shared/component';
import {
  Carousel,
  CarouselErrorFallback,
  CarouselSkeleton,
  ListHeader,
  PopUp,
  HomeBesookt,
  HomeBesooktErrorFallback,
  HomeBesooktSkeleton,
  HomeCard,
  HomeCardErrorFallback,
  HomeCardSkeleton,
  HomeCommunity,
} from '@/feature/home/component';

import styles from './MainPage.module.css';

export default function MainPage() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    requestPermission(); // 앱 실행 시 푸시 알림 권한 요청

    // 포그라운드 메시지 수신 이벤트 리스너 등록
    onMessageListener()
      .then((payload) => {
        setNotification(payload.notification);
      })
      .catch((err) => console.log('메시지 수신 오류:', err));
  }, []);

  return (
    <main>
      <Header className={styles.header} />

      {notification && (
        <NotificationCard title={notification.title} body={notification.body} />
      )}
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
