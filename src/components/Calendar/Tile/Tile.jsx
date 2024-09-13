import { Icon } from '@/components/Icon';

import { isToday } from '@/utils';

import styles from './Tile.module.css';

export default function Tile({ date, data = [] }) {
  const currentDate = new Date(date);
  const checked = data.find(({ createdAt }) => {
    const checkedDate = new Date(createdAt);
    return (
      currentDate.getFullYear() === checkedDate.getFullYear() &&
      currentDate.getMonth() === checkedDate.getMonth() &&
      currentDate.getDate() === checkedDate.getDate()
    );
  });

  const difference = checked?.difference;

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
      {difference && <span className={styles.difference}>+{difference}</span>}
    </div>
  );
}
