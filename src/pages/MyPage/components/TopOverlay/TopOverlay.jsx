import { Link } from 'react-router-dom';

import { Icon } from '@/shared/component';

import styles from './TopOverlay.module.css';

export default function TopOverlay() {
  return (
    <div className={styles.myPageUpper}>
      <div className={styles.logoOverlay}>
        <Link to='edit-info'>
          <Icon
            className={styles.editIcon}
            id='pencil-underline'
            stroke='white'
            width={20}
            height={20}
          />
        </Link>
      </div>
    </div>
  );
}
