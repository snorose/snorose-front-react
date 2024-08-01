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
        {['현재 비밀번호', '새 비밀번호', '비밀번호 확인'].map((item) => (
          <div className={styles.passwordWrapper}>
            <h3 className={styles.title} key={item}>
              {item}
            </h3>
            <div className={styles.password}>
              <input type='password' className={styles.pwInput} />
              <Icon id='opened-eye' />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
