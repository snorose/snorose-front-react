import { useState, useEffect } from 'react';

import { defaultAxios } from '@/axios';

import { sendUser, certifyUser } from '@/apis';

import { Input } from '@/components/Input';
import { Submit } from '@/components/Submit';

import styles from './AuthorizationPage.module.css';

export default function AuthorizationPage({ email, setStage }) {
  const [authNum, setAuthNum] = useState('');
  const [codeStyle, setCodeStyle] = useState('ready');

  useEffect(() => {
    sendUser(email);
  }, [email]);

  async function CertifyUserAPI(input) {
    const data = { email: email, authNum: input };

    if (input?.length === 0) {
      return 'ready';
    } else {
      try {
        const response = await defaultAxios.post('/v1/users/certifyUser', data);
        if (response.data.isSuccess) {
          return 'right';
        } else {
          return 'wrong';
        }
      } catch (e) {
        console.log(e);
        return 'wrong';
      }
    }
  }

  return (
    <div className={styles.pageFrame}>
      <div>
        <div>
          <p className={styles.title}>이메일 인증</p>
          <p className={styles.text}>
            숙명 구글 이메일로 확인 코드를 보내드렸어요
          </p>
          <Input
            title={'확인 코드'}
            placeholder={'확인 코드를 입력하세요'}
            className={codeStyle}
            setClassName={setCodeStyle}
            classNameCheck={CertifyUserAPI}
            inputType={'authNum'}
            inputData={setAuthNum}
            data={authNum}
            errMsg={'코드를 다시 한 번 확인해주세요'}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <Submit
          btnName='다음으로'
          className={codeStyle === 'right' ? 'right' : 'ready'}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onClick={() => setStage((prev) => prev + 1)}
        />
      </div>
    </div>
  );
}
