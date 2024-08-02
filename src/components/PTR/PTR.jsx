import React from 'react';
import styles from './PTR.module.css';
import Icon from '../Icon/Icon';
import PullToRefresh from 'react-simple-pull-to-refresh';

export default function PTR({ children }) {
  const handleRefresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Refreshed!');
        resolve();
      }, 1500);
    });
  };

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
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
