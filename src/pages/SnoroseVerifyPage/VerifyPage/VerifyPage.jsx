import { useState } from 'react';

import { Button, Input } from '@/pages/SnoroseVerifyPage';

import styles from './VerifyPage.module.css';

export default function VerifyPage({ setStep }) {
  const [data, setData] = useState({ id: '', pw: '' });
  const handleData = (event) => {
    const { value, name } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const { id, pw } = data;

  return (
    <section className={styles.content}>
      <div className={styles.verify}>
        <Input
          label='아이디'
          name='id'
          type='text'
          value={id}
          placeholder='숙명포털 아이디를 입력해주세요'
          onChange={handleData}
        />
        <Input
          label='비밀번호'
          name='pw'
          type='password'
          value={pw}
          placeholder='숙명포털 비밀번호를 입력해주세요'
          onChange={handleData}
        />
      </div>
      <Button
        onClick={() => {
          console.log('인증~~');
          setStep('complete');
        }}
      >
        인증
      </Button>
    </section>
  );
}
