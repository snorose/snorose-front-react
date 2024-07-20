import { Link } from 'react-router-dom';
import styles from './BoardCard.module.css';

export default function BoardCard({
  className,
  to,
  name,
  desc,
  backgroundImage,
}) {
  const path = require(`../../assets/images/${backgroundImage}`);

  return (
    <Link className={`${styles.link} ${className}`} to={to}>
      <div
        className={styles.card}
        style={{
          backgroundImage: `url(${path})`,
        }}
      >
        <p className={styles.name}>{name}</p>
        <p className={styles.desc}>{desc}</p>
      </div>
    </Link>
  );
}
