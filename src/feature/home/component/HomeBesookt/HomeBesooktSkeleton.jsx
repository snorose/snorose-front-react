import { ShimmerEffect } from '@/shared/component';

import styles from './HomeBesooktSkeleton.module.css';

export default function HomeBesooktSkeleton() {
  return (
    <ShimmerEffect>
      <div className={styles.list}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>
    </ShimmerEffect>
  );
}
