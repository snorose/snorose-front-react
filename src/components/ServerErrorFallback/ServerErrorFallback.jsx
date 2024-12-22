import { MdOutlineReplay } from 'react-icons/md';

import styles from './ServerErrorFallback.module.css';

export default function ServerErrorFallback({ reset }) {
  return (
    <div className={styles.serverError}>
      <div className={styles.errorMessage}>
        <span>잠시 후 다시 시도해주세요</span>
        <span>요청을 처리하는데 실패했어요</span>
      </div>
      <MdOutlineReplay className={styles.retry} onClick={reset} />
    </div>
  );
}
