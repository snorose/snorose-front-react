import { Suspense } from 'react';

import { usePopUp } from '@/hooks';

import {
  Carousel,
  CarouselSkeleton,
  Footer,
  Header,
  PopUp,
} from '@/components';

import {
  HomeBesookt,
  HomeBesooktSkeleton,
  HomeCard,
  HomeCardSkeleton,
  HomeCommunity,
} from '@/pages/MainPage/components';

import styles from './MainPage.module.css';

export default function MainPage() {
  const { isPopUpOpend, closePopUp } = usePopUp();

  return (
    <main>
      <Header className={styles.header} />

      <Suspense fallback={<CarouselSkeleton />}>
        <Carousel className={styles.carousel} />
      </Suspense>

      <Suspense fallback={<HomeCardSkeleton />}>
        <HomeCard />
      </Suspense>

      <HomeCommunity className={styles.community} />
      <Suspense fallback={<HomeBesooktSkeleton />}>
        <HomeBesookt />
      </Suspense>

      <Footer />
      {isPopUpOpend && <PopUp close={closePopUp} />}
    </main>
  );
}
