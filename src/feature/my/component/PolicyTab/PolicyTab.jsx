import { Link } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { Icon } from '@/shared/component';

import styles from './PolicyTab.module.css';

const PolicyTab = () => {
  const { logout } = useAuth();

  return (
    <>
      <div className={styles.infoWrapper}>
        {[
          { label: '개인정보 처리방침', link: 'privacy-policy' },
          { label: '서비스 이용 약관', link: 'service-policy' },
        ].map((item, index) => (
          <div className={styles.itemList} key={index}>
            <Link to={item.link}>
              <div className={styles.item}>
                <span>{item.label}</span>
                <Icon id='angle-right' width={16} height={16} />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <button type='button' onClick={logout}>
          <div className={styles.logoutButton}>로그아웃</div>
        </button>
        <Link to='delete-account'>
          <div className={styles.deleteAccountButton}>회원탈퇴</div>
        </Link>
      </div>
    </>
  );
};

export default PolicyTab;
