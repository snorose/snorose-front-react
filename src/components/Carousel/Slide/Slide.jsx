import { useState } from 'react';

import defaultBanner from '@/assets/images/bannerError.svg';

import styles from './Slide.module.css';
import { Link } from 'react-router-dom';

export default function Slide({ src, redirectUrl, alt }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Link className={styles.slide} to={redirectUrl}>
      <img src={imgSrc} alt={alt} onError={() => setImgSrc(defaultBanner)} />
    </Link>
  );
}
