import styles from './Chip.module.css';
import { PROGRESS } from '@/feature/event/constant';

export default function Chip({ type, label }) {
  if (!label) return null;

  // 이벤트 게시판 응모상황 표시
  const inProgress = label === 'IN_PROGRESS' ? styles.inProgress : '';
  const displayLabel = type === 'event' ? PROGRESS[label] : label;

  return <div className={`${styles.chip} ${inProgress}`}>{displayLabel}</div>;
}
