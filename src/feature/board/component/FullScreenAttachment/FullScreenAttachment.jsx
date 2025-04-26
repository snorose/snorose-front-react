import { React, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard } from 'swiper/modules';

import { Icon } from '@/shared/component';

import styles from './FullScreenAttachment.module.css';
import 'swiper/css';
import 'swiper/swiper-bundle.css';

export default function FullScreenAttachment({
  attachmentUrls,
  clickedImageIndex,
  setClickedImageIndex,
}) {
  const paginationRef = useRef(null);
  return (
    <div className={styles.fullScreenContainer}>
      <div className={styles.topContainer}>
        <Icon
          id={'x'}
          width={'1.875rem'}
          height={'1.875rem'}
          className={styles.x}
          onClick={() => {
            setClickedImageIndex(0);
          }}
        />
        <p
          className={`${styles.pagination} swiper-custom-pagination`}
          ref={paginationRef}
        ></p>
      </div>
      <div className={styles.bodyContainer}>
        <Swiper
          autoHeight={true}
          className={styles.attachmentsContainer}
          modules={[Pagination, Keyboard]}
          slidesPerView={1}
          initialSlide={clickedImageIndex - 1}
          keyboard={{
            enabled: true,
            onlyInViewport: false,
          }}
          pagination={{
            el: '.swiper-custom-pagination',
            type: 'fraction',
          }}
        >
          {attachmentUrls.map((att, index) => (
            <SwiperSlide key={index} className={styles.attachmentsSlide}>
              <img src={att} className={styles.attachment} draggable={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
