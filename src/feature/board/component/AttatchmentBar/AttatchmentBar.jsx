import { React, useRef } from 'react';
import { useState } from 'react';
import styles from './AttatchmentBar.module.css';
import { Icon } from '@/shared/component';

export default function AttatchmentBar({ setImages }) {
  const img = useRef();
  const vid = useRef();
  const changeImageUpload = async (e) => {
    const { files } = e.target;
    const fileArray = Array.from(files);

    const readFilesAsDataURLs = fileArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });

    const imageDataUrls = await Promise.all(readFilesAsDataURLs);
    setImages(imageDataUrls);
  };
  const [imageIconState, setImageIconState] = useState('image');
  const [videoIconState, setVideoIconState] = useState('video');

  return (
    <div className={styles.bar}>
      <div className={styles.attatchmentBar}>
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
