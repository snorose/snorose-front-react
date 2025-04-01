import React from 'react';
import styles from './AttatchmentBar.module.css';
import { Icon } from '@/shared/component';

export default function AttatchmentBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.attatchmentBar}>
        <Icon id='image' width={24} height={24} className={styles.picture} />
        <Icon id='video' width={24} height={24}></Icon>
      </div>
    </div>
  );
}
