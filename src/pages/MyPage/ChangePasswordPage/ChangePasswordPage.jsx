import React, { useState } from 'react';
import styles from './ChangePasswordPage.module.css';
import Icon from '../../../components/Icon/Icon';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';

const handlePasswordType = (setter) => {
  setter((prev) => ({
    type: prev.visible ? 'password' : 'text',
    visible: !prev.visible,
  }));
};

export default function ChangePasswordPage() {
  const [currentPasswordType, setCurrentPasswordType] = useState({
    type: 'password',
    visible: false,
  });
  const [newPasswordType, setNewPasswordType] = useState({
    type: 'password',
    visible: false,
  });
  const [newPasswordCheckType, setNewPasswordCheckType] = useState({
    type: 'password',
    visible: false,
  });
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordCheckError, setNewPasswordCheckError] = useState('');

  const specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]/;
  const emojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;

  // 새 비밀번호 유효성 검사 함수
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (
      value.length < 8 ||
      !/[A-Za-z]/.test(value) ||
      !/\d/.test(value) ||
      !specialCharRegex.test(value) ||
      emojiRegex.text(value)
    ) {
      setNewPasswordError(
        '  영어, 숫자, 특수문자를 포함해 8자 이상으로 작성해주세요'
      );
    } else {
      setNewPasswordError('');
    }
  };

  // 비밀번호 확인 유효성 검사 함수
  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setNewPasswordCheck(value);

    if (value !== newPassword) {
      setNewPasswordCheckError('비밀번호가 일치하지 않습니다');
    } else {
      setNewPasswordCheckError('');
    }
  };

  return (
    <main className={styles.changePasswordPage}>
      <div className={styles.topContainer}>
        <BackAppBar />
        <button className={styles.submitBtn}>완료</button>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>현재 비밀번호</h3>
          <div className={styles.inputWrapper}>
            <input
              type={currentPasswordType.type}
              className={styles.inputText}
              placeholder='기존 비밀번호를 입력하세요'
            />
            <Icon
              onClick={() => handlePasswordType(setCurrentPasswordType)}
              id={currentPasswordType.visible ? 'closed-eye' : 'opened-eye'}
            />
          </div>
        </div>

        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>새 비밀번호</h3>
          <div
            className={`${styles.inputWrapper} ${newPasswordError ? styles.errorInputWrapper : ''}`}
          >
            <input
              type={newPasswordType.type}
              className={`${styles.inputText} ${newPasswordError ? styles.errorInputText : ''}`}
              placeholder='새로운 비밀번호를 입력하세요'
              onChange={handlePasswordChange}
            />
            <Icon
              onClick={() => handlePasswordType(setNewPasswordType)}
              id={newPasswordType.visible ? 'closed-eye' : 'opened-eye'}
            />
          </div>
          {newPasswordError && (
            <p className={styles.errorMessage}>{newPasswordError}</p>
          )}
        </div>

        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>비밀번호 확인</h3>
          <div
            className={`${styles.inputWrapper} ${newPasswordCheckError ? styles.errorInputWrapper : ''}`}
          >
            <input
              type={newPasswordCheckType.type}
              className={`${styles.inputText} ${newPasswordCheckError ? styles.errorInputText : ''}`}
              placeholder='비밀번호를 다시 입력하세요'
              onChange={handlePasswordCheckChange}
            />
            <Icon
              onClick={() => {
                handlePasswordType(setNewPasswordCheckType);
              }}
              id={newPasswordCheckType.visible ? 'closed-eye' : 'opened-eye'}
            />
          </div>
          {newPasswordCheckError && (
            <p className={styles.errorMessage}>{newPasswordCheckError}</p>
          )}
        </div>
      </div>
    </main>
  );
}
