import { useState, useEffect } from 'react';

import { useSendUser, useCertifyUser } from '@/apis';

import { Input, Button } from '@/shared/component';

import styles from './AuthorizationStep.module.css';

export default function AuthorizationStep({ email, setStage }) {
  const sendUser = useSendUser();
  const certifyUser = useCertifyUser();
  const [authNum, setAuthNum] = useState('');
  const [codeStyle, setCodeStyle] = useState('ready');

  useEffect(() => {
    sendUser(email);
  }, [email]);

  // 인증 처리 함수
  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      // authNum이 객체인 경우와 문자열인 경우를 모두 처리
      const authCode = typeof authNum === 'object' ? authNum.authNum : authNum;

      const res = await certifyUser({
        email: email,
        authNum: authCode,
      });

      if (res) {
        setStage(3); // 직접 3단계로 설정
      } else {
        setCodeStyle('wrong');
      }
    } catch (error) {
      console.error('인증 처리 중 오류:', error);
      setCodeStyle('wrong');
    }
  };

  return (
    <>
      <div>
        <p className={styles.title}>
          이메일 인증을 <br />
          완료해 주세요
        </p>
        <p className={styles.text}>
          숙명 구글 이메일로 확인 코드를 보내드렸어요
        </p>
        <Input
          title={'확인 코드'}
          placeholder={'확인 코드를 입력해 주세요'}
          className={codeStyle}
          setClassName={setCodeStyle}
          inputType={'authNum'}
          data={authNum}
          inputData={setAuthNum}
          errMsg={'코드를 다시 한 번 확인해 주세요'}
        />
      </div>

      <div className={styles.submit}>
        <Button
          btnName='다음으로'
          className={'right'}
          onSubmit={handleVerification}
          onClick={handleVerification}
        />
      </div>
    </>
  );
}
