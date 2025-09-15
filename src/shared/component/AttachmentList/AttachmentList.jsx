import React from 'react';

import { Icon } from '@/shared/component';

import styles from './AttachmentList.module.css';

export default function AttachmentList({
  attachmentsInfo,
  setAttachmentsInfo,
}) {
  return (
    <ul className={styles.imageList}>
      {attachmentsInfo.map((att, index) => (
        <li
          key={index}
          className={styles.imageContainer}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', index);
            e.dataTransfer.effectAllowed = 'move';
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            const draggedIndex = parseInt(
              e.dataTransfer.getData('text/plain'),
              10
            );
            const droppedIndex = index;

            //같은 위치에 드롭했을 때
            if (draggedIndex === droppedIndex) return;

            //다른 위치에 드롭했을 때
            setAttachmentsInfo((prev) => {
              const copy = [...prev];
              const [moved] = copy.splice(draggedIndex, 1);
              copy.splice(droppedIndex, 0, moved);
              return copy;
            });
          }}
        >
          {attachmentsInfo[index].type === 'PHOTO' ? (
            //첨부파일이 이미지일 경우
            <img
              src={att.url || URL.createObjectURL(att.file)}
              className={styles.image}
            />
          ) : (
            //첨부파일이 영상일 경우
            <div className={styles.image}>
              <video
                src={att.url || URL.createObjectURL(att.file)}
                playsInline
                className={styles.video}
              />
              <Icon
                id='video-fill'
                width={'0.875rem'}
                height={'0.875rem'}
                className={styles.videoIcon}
              />
            </div>
          )}
          <Icon
            id='image-select-bar'
            width={'3rem'}
            height={'9.6rem'}
            fill='white'
            className={styles.imageSelectBar}
          />
        </li>
      ))}
    </ul>
  );
}
