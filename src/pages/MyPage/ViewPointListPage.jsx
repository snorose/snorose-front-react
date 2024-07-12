import React from 'react';
import styles from './ViewPointListPage.module.css';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';

export default function ViewPointListPage() {
  return (
    <main className={styles.viewPointListPage}>
      <div className={styles.arrowBackIconWrapper}>
        <Link to='/my-page' className={styles.arrowBackIcon}>
          <Icon id='arrow-back' />
        </Link>
      </div>

      <div className={styles.topContainer}>
        <h1 className={styles.title}>보유 포인트</h1>
        <h1 className={styles.totalPoint}>39</h1>
      </div>

      <div className={styles.pointListContainer}>
        <div className={styles.pointBox}>
          <div className={styles.pointWrapper}>
            <div className={styles.pointIconWrapper}>
              <Icon id='point-plus' className={styles.icon} />
            </div>
            <div className={styles.pointContent}>
              <div className={styles.pointTitle}>댓글 포인트</div>
              <div className={styles.pointDesc}>
                어제 간식으로 나온거 맛있던데 총학 공지에 나와있는...
              </div>
              <div className={styles.pointDate}>2024.06.01 15:23:00</div>
            </div>
          </div>
          <div className={styles.pointScore}>
            <p className={styles.chargePoint}>+ 2</p>
          </div>
        </div>
      </div>
    </main>
  );
}
