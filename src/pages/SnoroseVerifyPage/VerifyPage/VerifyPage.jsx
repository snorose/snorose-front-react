import { useState } from 'react';

import { verifySookmyungPortal } from '@/apis';

import { useToast } from '@/hooks/index.js';

import { Button, Input } from '@/pages/SnoroseVerifyPage';

import { InputPassword } from '@/components';

import { isEmailValid } from '@/utils';

import { TOAST } from '@/constants';

import styles from './VerifyPage.module.css';

export default function VerifyPage({ setStep }) {
  const { toast } = useToast();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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

    try {
      await verifySookmyungPortal({
        studentId,
        password,
        email,
      });

      setStep('complete');
    } catch ({ response }) {
      toast(response.data.message);
    }
  };

  return (
    <section className={styles.content}>
      <div className={styles.verify}>
        <Input
          label='아이디'
          type='text'
          value={studentId}
          placeholder='숙명포털 아이디를 입력해주세요'
          onChange={(event) => setStudentId(event.target.value)}
        />
        <InputPassword
          title='비밀번호'
          placeholder='숙명포털 비밀번호를 입력해주세요'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          isStatic
        />
        <Input
          label='이메일'
          type='text'
          value={email}
          placeholder='이메일을 입력해주세요'
          onChange={(event) => setEmail(event.target.value)}
          validate={isEmailValid}
          errorMessage='올바른 이메일을 입력해주세요'
        />
      </div>
      <Button onClick={verify}>인증</Button>
    </section>
  );
}
