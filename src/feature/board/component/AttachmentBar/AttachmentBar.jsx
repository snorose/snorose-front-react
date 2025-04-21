import { React, useRef } from 'react';
import { useState } from 'react';

import { useToast } from '@/shared/hook';
import { Icon } from '@/shared/component';

import styles from './AttachmentBar.module.css';

export default function AttachmentBar({ setAttachments, setImages }) {
  const { toast } = useToast();
  const img = useRef();
  const vid = useRef();
  const changeImageUpload = async (e) => {
    const { files } = e.target;
    const maxFileSize = 50 * 1024 * 1024; //50MB
    let totalFileSize = 0;

    //첨부파일 개수 제한
    if (files.length > 10) {
      toast('사진은 최대 10장까지만 첨부할 수 있습니다.');
      return;
    }

    //첨부파일 용량 제한
    for (let file of files) {
      totalFileSize = totalFileSize + file.size;
    }
    if (totalFileSize > maxFileSize) {
      toast('최대 50MB까지만 첨부할 수 있습니다.');
      return;
    }

    //인풋된 파일들 읽기
    const fileArray = Array.from(files);
    const readFilesAsDataURLs = fileArray.map((file) => {
      setAttachments((attArray) => [
        ...attArray,
        {
          fileName: file.name,
          fileComment: '',
          type: 'PHOTO',
        },
      ]);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });

    const imageDataUrls = await Promise.all(readFilesAsDataURLs);
    setImages((imgArray) => [...imgArray, ...imageDataUrls]);
  };
  const [imageIconState, setImageIconState] = useState('image');
  const [videoIconState, setVideoIconState] = useState('video');

  return (
    <div className={styles.bar}>
      <div className={styles.attachmentBar}>
        <Icon
          id={imageIconState}
          width={24}
          height={24}
          className={styles.image}
          onClick={() => {
            setImageIconState('image-fill');
            img.current.click();
          }}
          onMouseOver={() => setImageIconState('image-fill')}
          onMouseLeave={() => setImageIconState('image')}
        />
        <input
          type='file'
          accept='image/*'
          className={styles.imageInput}
          ref={img}
          onChange={changeImageUpload}
          multiple
        />
        <Icon
          id={videoIconState}
          width={24}
          height={24}
          onClick={() => {
            setVideoIconState('video-fill');
            vid.current.click();
          }}
          onMouseOver={() => setVideoIconState('video-fill')}
          onMouseLeave={() => setVideoIconState('video')}
        />
        <input
          type='file'
          accept='video/*'
          className={styles.videoInput}
          ref={vid}
          multiple
        />
      </div>
    </div>
  );
}
