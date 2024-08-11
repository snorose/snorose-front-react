import PullToRefresh from 'react-simple-pull-to-refresh';

import { Icon } from '../Icon';

import styles from './PTR.module.css';

export default function PTR({ children, onRefresh }) {

  return (
    <PullToRefresh
      onRefresh={onRefresh}
      refreshingContent={
        <div className={styles.refreshBox}>
          <div className={styles.refreshIcon}>
            <Icon id='cloud' width='44' height='27' />
          </div>
        </div>
      }
    >
      {children}
    </PullToRefresh>
  );
}
