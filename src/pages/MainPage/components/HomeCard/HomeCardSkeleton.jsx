import { ShimmerEffect } from '@/components';

import styles from './HomeCardSkeleton.module.css';

export default function HomeCardSkeleton() {
  return (
    <ShimmerEffect>
      <div className={styles.layout}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
      </div>
    </ShimmerEffect>
  );
}
