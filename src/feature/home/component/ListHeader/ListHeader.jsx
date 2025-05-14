import { Link } from 'react-router-dom';

import { Icon } from '@/shared/component';

import styles from './ListHeader.module.css';

export default function ListHeader({ to, title }) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <Link to={to} className={styles.more}>
        더보기
        <Icon id='chevron-right' width={24} height={24} />
      </Link>
    </div>
  );
}
