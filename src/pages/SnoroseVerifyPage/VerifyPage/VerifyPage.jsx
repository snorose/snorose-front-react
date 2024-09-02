import { useState } from 'react';

import { Button, Input } from '@/pages/SnoroseVerifyPage';

import { InputPassword } from '@/components/index.js';

import { isEmailValid } from '@/utils/validate.js';

import styles from './VerifyPage.module.css';

export default function VerifyPage({ setStep }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');

  const isAllFieldsCompleted = id && pw && email;

  return (
    <section className={styles.content}>
      <div className={styles.verify}>
        <Input
          label='아이디'
          type='text'
          value={id}
          placeholder='숙명포털 아이디를 입력해주세요'
          onChange={(event) => setId(event.target.value)}
        />
        <InputPassword
          title='비밀번호'
          placeholder='숙명포털 비밀번호를 입력해주세요'
          value={pw}
          onChange={(event) => setPw(event.target.value)}
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
      <Button
        onClick={() => {
          if (isAllFieldsCompleted && isEmailValid(email)) {
            console.log('인증~~');
            setStep('complete');
          }
        }}
      >
        인증
      </Button>
    </section>
  );
}
