import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Slide } from '@/components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';

export default function Carousel({ slides = [], delay }) {
  return (
    <Swiper
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
