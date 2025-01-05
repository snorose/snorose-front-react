import { ShimmerEffect } from '@/components';

import styles from './CarouselSkeleton.module.css';

export default function CarouselSkeleton() {
  return (
    <ShimmerEffect>
      <div className={styles.layout}></div>
    </ShimmerEffect>
  );
}
