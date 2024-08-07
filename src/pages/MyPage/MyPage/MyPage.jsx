import React, { useEffect } from 'react';
import styles from './MyPage.module.css';
import Icon from '../../../components/Icon/Icon';
import { Link, useSearchParams } from 'react-router-dom';
import AccountTab from './AccountTab';
import ActivityTab from './ActivityTab';
import PolicyTab from './PolicyTab';

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'account';

  const handleTabClick = (tab) => {
    setSearchParams({ tab });
  };

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'account' });
    }
  }, [searchParams, setSearchParams]);

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
          <Link to='view-point-list'>
            <div className={styles.pointWrapper}>
              <div className={styles.point}>
                <Icon id='point-circle' />
                39
              </div>
              <div className={styles.pointList}>
                포인트 내역 보기
                <Icon id='angle-right' fill='#00368e' />
              </div>
            </div>
          </Link>
        </div>

        {/* 탭 메뉴 */}
        <div className={styles.tabMenu}>
          {['account', 'activity', 'policy'].map((tab) => (
            <div
              key={tab}
              className={`${styles.tab} ${
                activeTab === tab ? styles.active : ''
              }`}
              onClick={() => {
                handleTabClick(tab);
              }}
            >
              {tab === 'account' && '계정 정보'}
              {tab === 'activity' && '내 활동'}
              {tab === 'policy' && '이용 안내'}
            </div>
          ))}
        </div>

        {/* 계정 정보 */}
        {activeTab === 'account' && <AccountTab />}

        {/* 내 활동 */}
        {activeTab === 'activity' && <ActivityTab />}

        {/* 이용 안내 */}
        {activeTab === 'policy' && <PolicyTab />}
      </div>
    </main>
  );
}
