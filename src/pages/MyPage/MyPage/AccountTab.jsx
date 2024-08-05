import React from 'react';
import styles from './MyPage.module.css';
import { Link } from 'react-router-dom';

const AccountTab = () => {
  return (
    <>
      <div className={styles.infoWrapper}>
        {[
          { label: '아이디', value: 'suen0904' },
          { label: '이메일', value: 'suen0904@sookmyung.ac.kr' },
          { label: '학번', value: '17123123' },
          { label: '전공', value: '시각영상디자인과' },
          { label: '생년월일', value: '1996. 01. 01' },
        ].map((info, index) => (
          <div className={styles.info} key={index}>
            <div className={styles.label}>{info.label}</div>
            <div className={styles.value}>{info.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <Link to='edit-info'>
          <div className={styles.editButton}>내 정보 수정</div>
        </Link>
        <Link to='password'>
          <div className={styles.passwordButton}>비밀번호 변경</div>
        </Link>
      </div>
    </>
  );
};

export default AccountTab;
