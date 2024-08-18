import React from 'react';
import Icon from '../../../components/Icon/Icon';
import styles from './MyPage.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';

const PolicyTab = () => {
  const { logout } = useAuth();

  return (
    <>
      <div className={styles.infoWrapper}>
        {[
          { label: '개인 정보 처리 방침', link: 'privacy-policy' },
          { label: '서비스 이용 약관', link: 'service-policy' },
        ].map((item, index) => (
          <div className={styles.itemList}>
            <Link to={item.link} key={index}>
              <div className={styles.item}>
                <span>{item.label}</span>
                <Icon id='angle-right' />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <button type='button' onClick={logout}>
          <div className={styles.editButton}>로그아웃</div>
        </button>
        <Link to='delete-account'>
          <div className={styles.passwordButton}>회원탈퇴</div>
        </Link>
      </div>
    </>
  );
};

export default PolicyTab;
