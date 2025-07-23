import { forwardRef } from 'react';

import { format } from 'date-fns';

import { Icon } from '@/shared/component';

import { POINT_CATEGORY_KOREAN_ENUM } from '@/feature/attendance/constant';

import styles from './PointLog.module.css';

const PointLog = forwardRef((props, ref) => {
  const { log } = props;
  const { difference, category, createdAt, reviewTitle } = log;

  return (
    <li ref={ref} className={styles.pointBox}>
      <div className={styles.pointIconContentWrapper}>
        <Icon
          id={difference > 0 ? 'heart-plus' : 'heart-minus'}
          width={28}
          height={28}
        />
        <div className={styles.pointContent}>
          <h2
            className={`${styles.pointTitle} ${difference < 0 ? styles.negative : ''}`}
          >
            {POINT_CATEGORY_KOREAN_ENUM[category]}
          </h2>
          {reviewTitle && (
            <span className={styles.pointDescription}>{reviewTitle}</span>
          )}
          <span className={styles.pointDate}>
            {format(new Date(createdAt), 'yyyy.MM.dd HH:mm:ss')}
          </span>
        </div>
      </div>
      <span
        className={`${styles.chargePoint} ${difference < 0 ? styles.negative : ''}`}
      >
        {`${difference > 0 ? '+' : ''}${difference.toLocaleString()}`}
      </span>
    </li>
  );
});

export default PointLog;
