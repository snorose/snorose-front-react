import React from 'react';
import styles from './MyPage.module.css';
import profileIcon from '../../assets/icon-profile.svg';

export default function MyPage() {
  return (
    <main className={styles.myPage}>
      <div className={styles.myPageUpper}>
        <div className={styles.logoOverlay}></div>
        <div className={styles.myInfo}>
          <p className={styles.name}>힘하리</p>
          <div className={styles.myImg}>
            <img src={profileIcon} alt='프로필 이미지' />
          </div>
          <div className={styles.profileYearMember}>
            <p className={styles.yearOfAdmission}>17학번</p>
            <p>|</p>
            <p className={styles.memberType}>정회원</p>
          </div>
        </div>
      </div>
      <div>이하 정보</div>
    </main>
  );
}
