import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './ListHeader.module.css';

export default function ListHeader({ to, title }) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <Link to={to} className={styles.more}>
        더보기
        <Icon id='rightArrow' width={12} height={13} />
      </Link>
    </div>
  );
}
