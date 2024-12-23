import { Link } from 'react-router-dom';

import { Icon } from '@/components';

import styles from './TopOverlay.module.css';

export default function TopOverlay() {
  return (
    <div className={styles.myPageUpper}>
      <div className={styles.logoOverlay}>
        <Link to='edit-info'>
          <Icon
            className={styles.editIcon}
            id='pencil-underline'
            width={20}
            height={20}
            fill='#fff'
            stroke='#fff'
          />
        </Link>
      </div>
    </div>
  );
}
