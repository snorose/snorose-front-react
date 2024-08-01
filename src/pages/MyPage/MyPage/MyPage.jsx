import React, { useState } from 'react';
import styles from './MyPage.module.css';
import Icon from '../../../components/Icon/Icon';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <main className={styles.myPage}>
      <div className={styles.myPageUpper}>
        <div className={styles.logoOverlay}></div>
      </div>

      <div className={styles.profileImage}>
        <Icon id='profile-basic' />
      </div>

      <div className={styles.myPageLower}>
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
            <Link to='view-point-list'>
              <a className={styles.pointList}>
                포인트 내역 보기
                <Icon id='arrow-right' />
              </a>
            </Link>
          </div>
        </div>

        <div className={styles.tabMenu}>
          <div
            className={`${styles.tab} ${activeTab === 'account' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('account');
            }}
          >
            계정 정보
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'activity' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('activity');
            }}
          >
            내 활동
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'guide' ? styles.active : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            이용 안내
          </div>
        </div>
      </div>
    </main>
  );
}
