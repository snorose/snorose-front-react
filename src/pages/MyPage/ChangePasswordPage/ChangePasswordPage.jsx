import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChangePasswordPage.module.css';
import Icon from '../../../components/Icon/Icon';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';

export default function ChangePasswordPage() {
  return (
    <main className={styles.changePasswordPage}>
      <BackAppBar />

      <div className={styles.contentContainer}>
        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>현재 비밀번호</h3>
          <div className={styles.password}>
            <input type='password' className={styles.pwInput} />
            <Icon id='opened-eye' />
          </div>
        </div>
        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>새 비밀번호</h3>
          <div className={styles.password}>
            <input type='password' className={styles.pwInput} />
            <Icon id='opened-eye' />
          </div>
        </div>
        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>비밀번호 확인</h3>
          <div className={styles.password}>
            <input type='password' className={styles.pwInput} />
            <Icon id='opened-eye' />
          </div>
        </div>
      </div>
    </main>
  );
}
