import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/hooks';

import { AccountTab, ActivityTab, PolicyTab } from '@/pages/MyPage/MyPage';

import { Icon } from '@/components';

import { ROLE_NAME } from '@/constants';

import defaultProfile from '@/assets/images/defaultProfile.svg';

import styles from './MyPage.module.css';

export default function MyPage() {
  const { userInfo, status } = useAuth();
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

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <main className={styles.myPage}>
      <div className={styles.myPageUpper}>
        <div className={styles.logoOverlay}>
          <Link to='edit-info'>
            <Icon
              className={styles.editIcon}
              id='pencil-underline'
              width={20}
              height={20}
              fill='#fff'
              stroke='#fff'
            />
          </Link>
        </div>
      </div>

      <div className={styles.profileImage}>
        <img
          // src={userInfo.userProfile ?? defaultProfile}
          src={defaultProfile}
          alt={`${userInfo.userName} 프로필`}
        />
      </div>

      <div className={styles.myPageLower}>
        <div className={styles.myInfo}>
          <div className={styles.name}>{userInfo.nickname}</div>
          <div className={styles.studentIdMemberType}>
            <div className={styles.studentId}>
              {userInfo.studentNumber.slice(0, 2)}학번
            </div>
            <Icon id='middle-dot' width={5} height={5} />
            <div className={styles.memberType}>
              {ROLE_NAME[userInfo.userRoleId]}
            </div>
          </div>
          <Link to='view-point-list'>
            <div className={styles.pointWrapper}>
              <div className={styles.point}>
                <Icon id='point-circle' width={32} height={32} />
                <span>{userInfo.balance.toLocaleString()}</span>
              </div>
              <div className={styles.pointList}>
                포인트 내역 보기
                <Icon id='angle-right' width={16} height={16} fill='#00368e' />
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
