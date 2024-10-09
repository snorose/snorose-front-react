import { Icon } from '@/components/Icon';

import styles from './FetchLoading.module.css';

export default function FetchLoading({ children, animation = true }) {
  return (
    <div className={styles.loading}>
      <div className={styles.centerBox}>
        <div className={animation ? styles.icon : styles.iconStatic}>
          <Icon id='cloud' width='25' height='16' />
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
}
