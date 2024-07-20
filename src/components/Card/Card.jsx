import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ className, to, title, tag, icon, isDark }) {
  const imgSrc = icon?.id ? require(`../../assets/images/${icon.id}.svg`) : '';

  return (
    <Link className={`${className} ${isDark && styles.dark}`} to={to}>
      <div className={styles.card}>
        <div className={styles.text}>
          <span className={styles.title}>{title}</span>
          <span className={styles.tag}>[{tag}]</span>
        </div>
        <img className={styles.image} src={imgSrc} alt='aa' />
      </div>
    </Link>
  );
}
