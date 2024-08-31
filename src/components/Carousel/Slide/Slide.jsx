import styles from './Slide.module.css';

export default function Slide({ src, alt }) {
  console.log(src);
  return <img className={styles.slide} src={src} alt={alt} />;
}
