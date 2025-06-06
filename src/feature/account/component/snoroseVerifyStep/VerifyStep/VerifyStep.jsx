import { useState } from 'react';

import { verifySookmyungPortal } from '@/apis';

import { useToast } from '@/shared/hook';
import {
  FetchLoadingOverlay,
  PrimaryButton,
  PwInput,
} from '@/shared/component';
import { isEmailValid } from '@/shared/lib';
import { TOAST } from '@/shared/constant';

import { AuthInput } from '@/feature/account/component';

import styles from './VerifyStep.module.css';

export default function VerifyStep({ setStep }) {
  const { toast } = useToast();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState();

  const isAllFieldsCompleted = studentId && password && email;

  const verify = async () => {
    if (!isAllFieldsCompleted) {
      toast(TOAST.VERIFY.notCompleted);
      return;
    }

    if (!isEmailValid(email)) {
      toast(TOAST.VERIFY.invalidEmail);
      return;
    }

    setLoading(true);

    try {
      await verifySookmyungPortal({
        studentId,
        password,
        email,
      });

      setStep('complete');
    } catch ({ response }) {
      toast(response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.content}>
      <div className={styles.verify}>
        <AuthInput
          label='학번'
          type='text'
          value={studentId}
          placeholder='학번을 입력해주세요'
          onChange={(event) => setStudentId(event.target.value)}
        />
        <PwInput
          title='숙명포털 비밀번호'
          placeholder='숙명포털 비밀번호를 입력해주세요'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          isStatic
        />
        <AuthInput
          label='이메일'
          type='text'
          value={email}
          placeholder='이메일을 입력해주세요'
          onChange={(event) => setEmail(event.target.value)}
          validate={isEmailValid}
          errorMessage='올바른 이메일을 입력해주세요'
        />
      </div>

      <PrimaryButton className={styles.button} onClick={verify}>
        인증
      </PrimaryButton>
      {loading && <FetchLoadingOverlay />}
    </section>
  );
}
