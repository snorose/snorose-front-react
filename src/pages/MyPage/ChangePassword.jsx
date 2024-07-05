import React from 'react';
import styles from './ChangePassword.module.css';
import arrowBackIcon from '../../assets/icon-arrow-back.svg';
import eyeIcon from '../../assets/icon-eye.svg';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/my-page');
  };

  return (
    <main className={styles.changePasswordPage}>
      <div className={styles.topContainer}>
        <div className={styles.goBackBtn} onClick={handleGoBack}>
          <img src={arrowBackIcon} alt='뒤로가기' />
        </div>
        <p className={styles.completeBtn}>완료</p>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.pwContent}>
          <h3 className={styles.title}>현재 비밀번호</h3>
          <div className={styles.pwBox}>
            <p className={styles.pwText}>비밀번호 내용</p>{' '}
            <img src={eyeIcon} alt='눈 아이콘' />
          </div>
        </div>
        <div className={styles.pwContent}>
          <h3 className={styles.title}>새 비밀번호</h3>
          <div className={styles.pwBox}>
            <p className={styles.pwText}>비밀번호 내용</p>{' '}
            <img src={eyeIcon} alt='눈 아이콘' />
          </div>
        </div>
        <div className={styles.pwContent}>
          <h3 className={styles.title}>비밀번호 확인</h3>
          <div className={styles.pwBox}>
            <p className={styles.pwText}>비밀번호 내용</p>
            <img src={eyeIcon} alt='눈 아이콘' className={styles.eyeIcon} />
          </div>
        </div>
      </div>
    </main>
  );
}
