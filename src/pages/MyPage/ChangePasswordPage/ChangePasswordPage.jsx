import React, { useState } from 'react';
import styles from './ChangePasswordPage.module.css';
import Icon from '../../../components/Icon/Icon';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';

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

  const handlePasswordType = (setter) => {
    setter((prev) => ({
      type: prev.visible ? 'password' : 'text',
      visible: !prev.visible,
    }));
  };

  return (
    <main className={styles.changePasswordPage}>
      <BackAppBar />

      <div className={styles.contentContainer}>
        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>현재 비밀번호</h3>
          <div className={styles.password}>
            <input
              type={currentPasswordType.type}
              className={styles.passwordInput}
            />
            <Icon
              onClick={() => handlePasswordType(setCurrentPasswordType)}
              id={currentPasswordType.visible ? 'closed-eye' : 'opened-eye'}
            />
          </div>
        </div>

        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>새 비밀번호</h3>
          <div className={styles.password}>
            <input
              type={newPasswordType.type}
              className={styles.passwordInput}
            />
            <Icon
              onClick={() => handlePasswordType(setNewPasswordType)}
              id={newPasswordType.visible ? 'closed-eye' : 'opened-eye'}
            />
          </div>
        </div>

        <div className={styles.passwordWrapper}>
          <h3 className={styles.title}>비밀번호 확인</h3>
          <div className={styles.password}>
            <input
              type={newPasswordCheckType.type}
              className={styles.passwordInput}
            />
            <Icon
              onClick={() => {
                handlePasswordType(setNewPasswordCheckType);
              }}
              id={newPasswordCheckType.visible ? 'closed-eye' : 'opened-eye'}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
