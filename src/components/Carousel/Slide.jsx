import React from 'react';
import styles from './Slide.module.css';

export default function Slide({ src, alt }) {
  return <img className={styles.slide} src={src} alt={alt} />;
}
