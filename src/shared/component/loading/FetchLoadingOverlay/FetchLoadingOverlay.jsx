import { FetchLoading } from '@/shared/component';
import { LOADING_MESSAGE } from '@/shared/constant';

import styles from './FetchLoadingOverlay.module.css';

export default function FetchLoadingOverlay({
  text = LOADING_MESSAGE.default,
}) {
  return (
    <div className={styles.loading}>
      <FetchLoading>
        <span className={styles.text}>{text}</span>
      </FetchLoading>
    </div>
  );
}
