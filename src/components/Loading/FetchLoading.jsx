import styles from './FetchLoading.module.css';
import { Icon } from '../Icon';

export default function FetchLoading({ children, animation = true }) {
  return (
    <div className={styles.loading}>
      <div className={styles.centerBox}>
        <div className={animation ? styles.icon : styles.icon_static}>
          <Icon id='cloud' width='25' height='16' />
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
}
