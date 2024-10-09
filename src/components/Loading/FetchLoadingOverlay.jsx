import { FetchLoading } from '@/components/Loading';

import { LOADING_MESSAGE } from '@/constants';

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
