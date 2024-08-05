import React from 'react';
import styles from './MyPage.module.css';
import Icon from '../../../components/Icon/Icon';

export default function MyPage() {
  return (
    <main className={styles.myPage}>
      <div className={styles.myPageUpper}>
        <div className={styles.logoOverlay}></div>
      </div>

      <div className={styles.myPageLower}>
        <div className={styles.profileImage}>
          <Icon id='profile-basic' />
        </div>
        <div className={styles.myInfo}>
          <div className={styles.name}>힘하리</div>
          <div className={styles.studentIdMemberType}>
            <div className={styles.studentId}>17학번</div>
            <Icon id='middle-dot' />
            <div className={styles.memberType}>정회원</div>
          </div>
          <div className={styles.pointWrapper}>
            <div className={styles.point}>
              <Icon id='point-circle' />
              39
            </div>
            <div className={styles.pointList}>포인트 내역 보기</div>
          </div>
        </div>
      </div>
    </main>
  );
}
