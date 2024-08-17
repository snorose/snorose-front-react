import styles from './FetchLoading.module.css';
import { Icon } from '../Icon';

export default function FetchLoading({ children }) {
  return (
    <div className={styles.loading}>
      <div className={styles.centerBox}>
        <div className={styles.icon}>
          <Icon id='cloud' width='25' height='16' />
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
}
