import { Link } from 'react-router-dom';

import arrowBackIcon from '../../../assets/icon-arrow-back.svg';
import eyeIcon from '../../../assets/icon-eye.svg';

import styles from './ChangePasswordPage.module.css';

export default function ChangePasswordPage() {
  return (
    <main className={styles.changePasswordPage}>
      <div className={styles.topContainer}>
        <Link to='/my-page' className={styles.goBackBtn}>
          <img src={arrowBackIcon} alt='뒤로가기' />
        </Link>
        <p className={styles.completeBtn}>완료</p>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.pwContent}>
          <h3 className={styles.title}>현재 비밀번호</h3>
          <div className={styles.pwBox}>
            <input
              type='password'
              className={styles.pwInput}
              placeholder='비밀번호 내용'
            />
            <img src={eyeIcon} alt='눈 아이콘' className={styles.eyeIcon} />
          </div>
        </div>
        <div className={styles.pwContent}>
          <h3 className={styles.title}>새 비밀번호</h3>
          <div className={styles.pwBox}>
            <input
              type='password'
              className={styles.pwInput}
              placeholder='비밀번호 내용'
            />
            <img src={eyeIcon} alt='눈 아이콘' className={styles.eyeIcon} />
          </div>
        </div>
        <div className={styles.pwContent}>
          <h3 className={styles.title}>비밀번호 확인</h3>
          <div className={styles.pwBox}>
            <input
              type='password'
              className={styles.pwInput}
              placeholder='비밀번호 내용'
            />
            <img src={eyeIcon} alt='눈 아이콘' className={styles.eyeIcon} />
          </div>
        </div>
      </div>
    </main>
  );
}
