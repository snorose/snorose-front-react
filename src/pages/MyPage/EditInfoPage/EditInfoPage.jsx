import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EditInfoPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';

export default function EditInfoPage() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [nameError, setNameError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]/;

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (specialCharRegex.test(value)) {
      setNameError('특수문자는 사용할 수 없습니다');
    } else {
      setNameError('');
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    if (specialCharRegex.test(value)) {
      setNicknameError('특수문자는 사용할 수 없습니다');
    } else {
      setNicknameError('');
    }
  };

  // 프로필 이미지 선택시 이미지 파일 선택 기능
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <main className={styles.editInfoPage}>
      <div className={styles.topContainer}>
        <Link to='/my-page' className={styles.goBackBtn}>
          <div className={styles.arrowBackIconWrapper}>
            <Icon id='arrow-back' />
          </div>
        </Link>
        <button className={styles.completionBtn}>완료</button>
      </div>

      <div className={styles.profileContainer}>
        <div
          className={styles.profileImg}
          onClick={() => document.getElementById('profileImageInput').click()}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt='프로필'
              className={styles.profilePreview}
            />
          ) : (
            <Icon id='profile-basic-camera' />
          )}
        </div>
        <input
          type='file'
          id='profileImageInput'
          style={{ display: 'none' }}
          accept='image/*'
          onChange={handleProfileImageChange}
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h3 className={styles.title}>이름</h3>
          <div
            className={`${styles.inputWrapper} ${nameError ? styles.errorInputWrapper : ''}`}
          >
            <input
              type='text'
              className={`${styles.inputText} ${nameError ? styles.errorInputText : ''}`}
              placeholder='이름을 입력하세요'
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <p className={styles.errorMessage}>{nameError}</p>}
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
            <div className={styles.calendarIconWrapper}>
              <Icon id='calendar' />
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>닉네임</h3>
          <div
            className={`${styles.inputWrapper} ${nicknameError ? styles.errorInputWrapper : ''}`}
          >
            <input
              type='text'
              className={`${styles.inputText} ${nicknameError ? styles.errorInputText : ''}`}
              placeholder='닉네임을 입력하세요'
              value={nickname}
              onChange={handleNicknameChange}
            />
            {nicknameError && (
              <p className={styles.errorMessage}>{nicknameError}</p>
            )}
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
            <div className={styles.arrowDownIconWrapper}>
              <Icon id='arrow-down' />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
