import { useState } from 'react';

import defaultBanner from '@/assets/images/bannerError.svg';

import styles from './Slide.module.css';

export default function Slide({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      className={styles.slide}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(defaultBanner)}
    />
  );
}
