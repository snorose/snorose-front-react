import React, { useState } from 'react';
import styles from './ChangePasswordPage.module.css';
import { BackAppBar, ActionButton } from '@/components/AppBar';
import InputPassword from '@/components/InputPassword/InputPassword';

const handlePasswordChangeSubmit = () => {
  alert('비밀번호 변경이 완료되었습니다');
};

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');

  return (
    <main className={styles.changePasswordPage}>
      <header className={styles.topContainer}>
        <p>
          <BackAppBar />
        </p>
        <div className={styles.submitBtn}>
          <ActionButton onClick={handlePasswordChangeSubmit}>완료</ActionButton>
        </div>
      </header>

      <section className={styles.contentContainer}>
        <InputPassword
          title='현재 비밀번호'
          placeholder='기존 비밀번호를 입력하세요'
          value={currentPassword}
          onChange={setCurrentPassword}
          isStatic
        />

        <InputPassword
          title='새 비밀번호'
          placeholder='새로운 비밀번호를 입력하세요'
          value={newPassword}
          onChange={setNewPassword}
          validatePassword
        />

        <InputPassword
          title='비밀번호 확인'
          placeholder='비밀번호를 다시 입력하세요'
          value={newPasswordCheck}
          onChange={setNewPasswordCheck}
          isPasswordCheck
          compareValue={newPassword}
        />
      </section>
    </main>
  );
}
