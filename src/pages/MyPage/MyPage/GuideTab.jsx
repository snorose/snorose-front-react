import React from 'react';
import Icon from '../../../components/Icon/Icon';
import styles from './MyPage.module.css';
import { Link } from 'react-router-dom';

const GuideTab = () => {
  return (
    <>
      <div className={styles.infoWrapper}>
        {[
          { label: '개인정보 처리 방침', link: 'privacy-policy' },
          { label: '서비스 이용 약관', link: 'service-policy' },
        ].map((item, index) => (
          <Link to={item.link} key={index}>
            <div className={styles.ItemWrapper}>
              <span>{item.label}</span>
              <Icon id='arrow-text-grey' />
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <Link to='#'>
          <div className={styles.editButton}>로그아웃</div>
        </Link>
        <Link to='delete-account'>
          <div className={styles.passwordButton}>회원탈퇴</div>
        </Link>
      </div>
    </>
  );
};

export default GuideTab;
