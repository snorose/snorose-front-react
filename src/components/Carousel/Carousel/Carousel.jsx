import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { getBannerImage } from '@/apis';

import { Slide } from '@/components';
import { QUERY_KEY } from '@/constants';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';

export default function Carousel({ delay = 3000, className }) {
  const { data: slides } = useQuery({
    queryKey: [QUERY_KEY.banner],
    queryFn: getBannerImage,
    gcTime: Infinity,
    staleTime: 1000 * 60 * 5,
    suspense: true,
  });

  return (
    <Swiper
      className={className}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay,
        disableOnInteraction: false,
      }}
      loop
      allowTouchMove={false}
    >
      {slides.map(({ imageUrl, redirectUrl }, index) => (
        <SwiperSlide key={index}>
          <Slide src={imageUrl} redirectUrl={redirectUrl} alt='banner' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
