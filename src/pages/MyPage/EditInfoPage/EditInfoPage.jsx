import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EditInfoPage.module.css';
import arrowBackIcon from '../../../assets/icon-arrow-back.svg';
import profileIcon from '../../../assets/icon-profile.svg';

export default function EditInfoPage() {
  return (
    <main className={styles.editInfoPage}>
      <div className={styles.topContainer}>
        <Link to='/my-page' className={styles.goBackBtn}>
          <img src={arrowBackIcon} alt='뒤로가기' />
        </Link>
        <p className={styles.completionBtn}>완료</p>
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.profileImg}>
          <img src={profileIcon} alt='프로필 이미지' />
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h3 className={styles.title}>이름</h3>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              className={styles.inputText}
              placeholder='이름을 입력하세요'
            />
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>생년월일</h3>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              className={styles.inputText}
              placeholder='생년월일을 선택하세요'
            />
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>닉네임</h3>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              className={styles.inputText}
              placeholder='닉네임을 입력하세요'
            />
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>전공</h3>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              className={styles.inputText}
              placeholder='전공을 선택하세요'
            />
          </div>
        </div>
      </div>
    </main>
  );
}
