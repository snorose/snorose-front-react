import React from 'react';
import { useState } from 'react';
import styles from './AttatchmentBar.module.css';
import { Icon } from '@/shared/component';

export default function AttatchmentBar() {
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
          onClick={() => setImageIconState('image-fill')}
          onMouseOver={() => setImageIconState('image-fill')}
          onMouseLeave={() => setImageIconState('image')}
        />
        <Icon
          id={videoIconState}
          width={24}
          height={24}
          onClick={() => setVideoIconState('video-fill')}
          onMouseOver={() => setVideoIconState('video-fill')}
          onMouseLeave={() => setVideoIconState('video')}
        ></Icon>
      </div>
    </div>
  );
}
