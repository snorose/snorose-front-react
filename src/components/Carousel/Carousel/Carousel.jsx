import { useRef, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getBannerImage } from '@/apis';

import { Slide } from '@/components';

import styles from './Carousel.module.css';
import { QUERY_KEY } from '@/constants/reactQuery.js';

export default function Carousel() {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEY.banner],
    queryFn: () => getBannerImage(),
    gcTime: Infinity,
    staleTime: 1000 * 60 * 5,
  });

  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerList = data ?? [];

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      if (currentIndex + 1 === bannerList.length) {
        setCurrentIndex(0);
        carouselRef.current.style.transform = `translateX(0)`;
      } else {
        setCurrentIndex((prev) => prev + 1);
        carouselRef.current.style.transform = `translateX(calc(-1 * 100% * ${currentIndex + 1}))`;
      }
    }, 5000);

    if (isError) {
      clearInterval(carouselTimer);
    }

    return () => clearInterval(carouselTimer);
  }, [bannerList.length, currentIndex, isError]);

  if (isError || !bannerList) {
    return <div className={styles.error}>배너를 불러올 수 없습니다</div>;
  }

  return (
    <div>
      <div ref={carouselRef} className={styles.carousel}>
        {bannerList.map(({ imageUrl, redirectUrl }, index) => (
          <Slide
            key={index}
            src={imageUrl}
            redirectUrl={redirectUrl}
            alt='banner'
          />
        ))}
      </div>
      <div className={styles.indicator}>
        {Array.from({ length: bannerList.length }).map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex && styles.current}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
