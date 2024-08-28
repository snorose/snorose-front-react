import { Icon } from '@/components/Icon';

import { isToday } from '@/utils/date.js';

import styles from './Tile.module.css';

export default function Tile({ date, checked = false, balance }) {
  return (
    <div className={styles.tile}>
      {checked ? (
        <Icon id='check-circle-fill' width='33' height='33' />
      ) : (
        <div className={`${styles.day} ${isToday(date) && styles.today}`}>
          {new Intl.DateTimeFormat('ko-KR', {
            day: 'numeric',
          })
            .format(date)
            .slice(0, -1)}
        </div>
      )}
      {balance && <span className={styles.balance}>+{balance}</span>}
    </div>
  );
}
