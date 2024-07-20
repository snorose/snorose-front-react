import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './Card.module.css';

export default function Card({ className, to, title, tag, icon, isDark }) {
  return (
    <Link
      className={`${styles.wrapper} ${className} ${isDark && styles.dark}`}
      to={to}
      style={{ width: '100%' }}
    >
      <div className={styles.card}>
        <div className={styles.text}>
          <span className={styles.title}>{title}</span>
          <span className={styles.tag}>[{tag}]</span>
        </div>
        <Icon id={icon.id} width={icon.width} height={icon.height} />
      </div>
    </Link>
  );
}
