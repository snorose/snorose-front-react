import { React, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard } from 'swiper/modules';

import { Icon, ChoiceModal } from '@/shared/component';
import { handleDownload, handleZipDownload } from '@/shared/lib';

import styles from './FullScreenAttachment.module.css';
import 'swiper/css';
import 'swiper/swiper-bundle.css';

export default function FullScreenAttachment({
  attachmentUrls,
  clickedImageIndex,
  setClickedImageIndex,
}) {
  const paginationRef = useRef(null);
  //스와이핑 액션에 대해 video와 swiper이 충돌이 나서, js 코드로 직접 영상을 틀어줘야함 -> ref 필요
  const videoRefs = useRef([]);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const urls = attachmentUrls.map((att) => att.url);

  return (
    <div className={styles.fullScreenContainer}>
      <div className={styles.topContainer}>
        <Icon
          id={'x'}
          width={'1.8rem'}
          height={'1.8rem'}
          className={styles.x}
          onClick={() => {
            //clickedImageIndex가 0이야지 FullScreenAttachment가 보이지 않음 (PostPage.jsx 분기처리 확인하기)
            setClickedImageIndex(0);
          }}
        />
        <p
          className={`${styles.pagination} swiper-custom-pagination`}
          ref={paginationRef}
        ></p>
        <Icon
          id={'download'}
          width={'2.4rem'}
          height={'2.4rem'}
          className={styles.download}
          onClick={() => {
            setIsChoiceModalOpen(true);
          }}
        />
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
              {att.type === 'PHOTO' ? (
                <img
                  src={att.url}
                  className={styles.attachment}
                  draggable={false}
                />
              ) : (
                <div
                  className={styles.videoWrapper}
                  onClick={() => {
                    const video = videoRefs.current[index];
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }}
                >
                  <video
                    //videoRefs의 첨부파일 index 위치에 el (video element) 저장
                    //특정 index 위치에만 video가 저장되고, 비어있는 index들은 자동으로 undefined가 채워짐
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={att.url}
                    className={`${styles.attachment} ${styles.videoElement}`}
                    draggable={false}
                    controls
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ChoiceModal
        id='save-image'
        isOpen={isChoiceModalOpen}
        closeFn={() => setIsChoiceModalOpen(false)}
        optionFns={[
          () => {
            //게시글 사진 전체 저장 - 전체 파일들을 zip 해서 리턴하기
            //attachmentUrls안에 있는 모든 url을 zip 해서 한 파일로 만들고, 그걸 다운로드 받게 하기
            handleZipDownload(urls);
            setIsChoiceModalOpen(false);
          },
          () => {
            //이 사진만 저장
            //attachmentUrls[currentIndex]
            const currentIndex =
              paginationRef.current?.textContent.split('/')[0] - 1;
            handleDownload(urls[currentIndex]);
            setIsChoiceModalOpen(false);
          },
        ]}
      />
    </div>
  );
}
