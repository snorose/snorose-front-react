import styles from './MyPage.module.css';
import Icon from '@/components/Icon/Icon';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { ROLE_NAME } from '@/constants';
import AccountTab from './AccountTab';
import ActivityTab from './ActivityTab';
import PolicyTab from './PolicyTab';

export default function MyPage() {
  const { userInfo, status } = useAuth({
    isRequiredAuth: true,
  });
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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || userInfo === null) {
    return null;
  }

  return (
    <main className={styles.myPage}>
      <div className={styles.myPageUpper}>
        <div className={styles.logoOverlay}>
          <Link to='edit-info'>
            <Icon id='pencil-underline' fill='#fff' stroke='#fff' />
          </Link>
        </div>
      </div>

      <div className={styles.profileImage}>
        {userInfo.userProfile === null ? (
          <Icon id='profile-basic' />
        ) : (
          <img src={userInfo.userProfile} alt={`${userInfo.userName} 프로필`} />
        )}
      </div>

      <div className={styles.myPageLower}>
        <div className={styles.myInfo}>
          <div className={styles.name}>{userInfo.userName}</div>
          <div className={styles.studentIdMemberType}>
            <div className={styles.studentId}>
              {userInfo.studentNumber.slice(0, 2)}학번
            </div>
            <Icon id='middle-dot' />
            <div className={styles.memberType}>
              {ROLE_NAME[userInfo.userRoleId]}
            </div>
          </div>
          <Link to='view-point-list'>
            <div className={styles.pointWrapper}>
              <div className={styles.point}>
                <Icon id='point-circle' />
                {userInfo.balance}
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
