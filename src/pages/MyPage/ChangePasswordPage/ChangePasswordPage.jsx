import { useState, useEffect } from 'react';
import styles from './ChangePasswordPage.module.css';
import { BackAppBar, ActionButton, InputPassword } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/apis';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks';
import { TOAST } from '@/constants';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordCheckError, setNewPasswordCheckError] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: updatePasswordMutate, isPending: isUpdatePasswordPending } =
    useMutation({
      mutationKey: ['updatePassword'],
      mutationFn: (body) => updatePassword(body),
      onSuccess: () => {
        toast(TOAST.UPDATE_PASSWORD_SUCCESS);
        navigate('/my-page');
      },
      onError: ({ response }) => {
        toast({
          id: 'UPDATE_PASSWORD_ERROR',
          message: response.data.message,
        });
      },
    });

  const validatePasswordStrength = (password) => {
    const specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]/;
    const emojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;

    if (
      password.length < 8 ||
      !/[A-Za-z]/.test(password) ||
      !/\d/.test(password) ||
      !specialCharRegex.test(password) ||
      emojiRegex.test(password)
    ) {
      setNewPasswordError(
        '영어, 숫자, 특수문자를 포함해 8자 이상으로 작성해주세요'
      );
    } else {
      setNewPasswordError('');
    }
  };

  const validatePasswordMatch = (passwordCheck, password) => {
    if (passwordCheck !== password) {
      setNewPasswordCheckError('비밀번호가 일치하지 않습니다');
    } else {
      setNewPasswordCheckError('');
    }
  };

  const handleSubmitButtonClick = () => {
    if (newPassword !== newPasswordCheck) {
      return;
    }

    updatePasswordMutate({
      currentPassword,
      newPassword,
    });
  };

  const handleCurrentPasswordInputChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordInputChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordInputChange = (e) => {
    setNewPasswordCheck(e.target.value);
  };

  useEffect(() => {
    if (newPassword) {
      validatePasswordStrength(newPassword);
    } else {
      setNewPasswordError('');
    }
  }, [newPassword]);

  useEffect(() => {
    if (newPasswordCheck) {
      validatePasswordMatch(newPasswordCheck, newPassword);
    } else {
      setNewPasswordCheckError('');
    }
  }, [newPasswordCheck, newPassword]);

  return (
    <main className={styles.changePasswordPage}>
      <header className={styles.topContainer}>
        <p>
          <BackAppBar />
        </p>
        <div className={styles.submitBtn}>
          <ActionButton
            type='button'
            disabled={
              isUpdatePasswordPending || newPassword !== newPasswordCheck
            }
            onClick={handleSubmitButtonClick}
          >
            완료
          </ActionButton>
        </div>
      </header>

      <section className={styles.contentContainer}>
        <InputPassword
          title='현재 비밀번호'
          placeholder='기존 비밀번호를 입력하세요'
          value={currentPassword}
          isStatic
          onChange={handleCurrentPasswordInputChange}
        />

        <InputPassword
          title='새 비밀번호'
          placeholder='새로운 비밀번호를 입력하세요'
          value={newPassword}
          errorMessage={newPasswordError}
          onChange={handleNewPasswordInputChange}
        />

        <InputPassword
          title='새 비밀번호 확인'
          placeholder='새 비밀번호를 다시 입력하세요'
          value={newPasswordCheck}
          errorMessage={newPasswordCheckError}
          onChange={handleConfirmNewPasswordInputChange}
        />
      </section>
    </main>
  );
}
