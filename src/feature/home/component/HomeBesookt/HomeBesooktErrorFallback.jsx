import { ServerErrorFallback } from '@/shared/component';

import styles from './HomeBesooktErrorFallback.module.css';

export default function HomeBesooktErrorFallback({
  error,
  resetErrorBoundary,
}) {
  const { status } = error;

  if (status === 401) {
    return <Fallback text={'로그인 후 이용해 주세요'} />;
  }

  if (status === 403) {
    return <Fallback text={'등업 완료 후 이용 가능해요'} />;
  }

  return <ServerErrorFallback reset={resetErrorBoundary} />;
}

const Fallback = ({ text }) => (
  <ul className={styles.list}>
    <li className={styles.item}>{text}</li>
    <li className={styles.item}>{text}</li>
    <li className={styles.item}>{text}</li>
  </ul>
);
