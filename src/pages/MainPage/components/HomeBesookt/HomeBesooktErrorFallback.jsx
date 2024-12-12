import { ServerErrorFallback } from '@/components';

import styles from './HomeBesooktErrorFallback.module.css';

export default function HomeBesooktErrorFallback({
  error,
  resetErrorBoundary,
}) {
  const { status } = error;
  let text = '';

  if (status === 500) {
    <ServerErrorFallback reset={resetErrorBoundary} />;
  }

  if (status === 401) {
    text = '로그인 후 이용 가능합니다.';
  }

  if (status === 403) {
    text = '등업 완료 후 이용 가능합니다.';
  }

  return (
    <ul className={styles.list}>
      <li className={styles.item}>{text}</li>
      <li className={styles.item}>{text}</li>
      <li className={styles.item}>{text}</li>
    </ul>
  );
}
