import PullToRefresh from 'react-simple-pull-to-refresh';

import { Icon } from '@/components/Icon';

import styles from './PTR.module.css';

export default function PTR({ children, onRefresh }) {
  return (
    <PullToRefresh
      onRefresh={onRefresh}
      refreshingContent={
        <div className={styles.refreshBox}>
          <div className={styles.refreshIcon}>
            <Icon id='cloud' width='34' height='21' />
          </div>
        </div>
      }
      pullingContent=''
    >
      {children}
    </PullToRefresh>
  );
}
