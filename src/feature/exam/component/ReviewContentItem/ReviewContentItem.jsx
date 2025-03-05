import { FLEX_ALIGN } from '@/feature/exam/constant';

import styles from './ReviewContentItem.module.css';

export default function ReviewContentItem({
  tag,
  value,
  align = FLEX_ALIGN.center,
}) {
  return (
    <div className={styles.item}>
      <span
        className={`${styles.tag} ${align === FLEX_ALIGN.flexStart && styles.flexStart}`}
      >
        {tag}
      </span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
