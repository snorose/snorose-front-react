import { forwardRef } from 'react';

import { format } from 'date-fns';

import { POINT_CATEGORY_KOREAN_ENUM } from '@/feature/attendance/constant';

import heartPlus from '@/assets/images/heartPlus.svg';
import heartMinus from '@/assets/images/heartMinus.svg';

import styles from './PointLog.module.css';

const PointLog = forwardRef((props, ref) => {
  const { log } = props;
  const { difference, category, createdAt, sourceDetail } = log;

  return (
    <li ref={ref} className={styles.pointBox}>
      <div className={styles.pointIconContentWrapper}>
        <img
          src={difference > 0 ? heartPlus : heartMinus}
          alt={difference > 0 ? '포인트 증가' : '포인트 감소'}
          className={styles.pointIcon}
        />
        <div className={styles.pointContent}>
          <h2
            className={`${styles.pointTitle} ${difference < 0 ? styles.negative : ''}`}
          >
            {POINT_CATEGORY_KOREAN_ENUM[category]}
          </h2>
          {sourceDetail && (
            <span className={styles.pointDescription}>{sourceDetail}</span>
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
