import { ServerErrorFallback } from '@/shared/component';

import { ACCESS_MESSAGES } from '@/feature/home/constant';

import styles from './HomeBesooktErrorFallback.module.css';

export default function HomeBesooktErrorFallback({
  error,
  resetErrorBoundary,
}) {
  const { status } = error;

  if (status === 401) {
    return <Fallback text={ACCESS_MESSAGES.NEED_LOGIN} />;
  }

  if (status === 403) {
    return <Fallback text={ACCESS_MESSAGES.NEED_UPGRADE} />;
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
