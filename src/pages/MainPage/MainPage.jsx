import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getBannerImage, getHomeNotice, getBest3 } from '@/apis';

import { useAuth, usePopUp } from '@/hooks';

import {
  Carousel,
  CarouselSkeleton,
  Footer,
  Header,
  PopUp,
} from '@/components';
import {
  HomeBesookt,
  HomeCard,
  HomeCardSkeleton,
  HomeCommunity,
} from '@/pages/MainPage/components';

import { QUERY_KEY, ROLE } from '@/constants';

import styles from './MainPage.module.css';

const BESOOKT_ROLES = [ROLE.user, ROLE.admin, ROLE.official];
const DEFAULT_BESOOKTS = Array.from({ length: 3 }, (_, i) => ({ postId: i }));

export default function MainPage() {
  const { isPopUpOpend, closePopUp } = usePopUp();
  const { status, userInfo } = useAuth();
  const isLogin = status === 'authenticated';

  const {
    data: besookt3,
    isLoading: besookt3IsLoading,
    isError: isBesookt3Error,
  } = useQuery({
    queryKey: [QUERY_KEY.best3],
    queryFn: () => getBest3(),
    staleTime: 1000 * 60 * 5,
    enabled: BESOOKT_ROLES.includes(userInfo?.userRoleId),
  });

  if (besookt3IsLoading) {
    return null;
  }

  if (isBesookt3Error) {
    return null;
  }

  const besookts = BESOOKT_ROLES.includes(userInfo?.userRoleId)
    ? besookt3
    : DEFAULT_BESOOKTS;

  return (
    <main>
      <Header className={styles.header} />

      <Suspense fallback={<CarouselSkeleton />}>
        <Carousel className={styles.carousel} callback={getBannerImage} />
      </Suspense>

      <Suspense fallback={<HomeCardSkeleton />}>
        <HomeCard callback={getHomeNotice} isLogin={isLogin} />
      </Suspense>

      <HomeCommunity className={styles.community} />
      <HomeBesookt besookts={besookts} />

      <Footer />
      {isPopUpOpend && <PopUp close={closePopUp} />}
    </main>
  );
}

// Margin, Flex 컴포넌트 삭제
