import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../../../components/Input/Input/Input';
import { Submit } from '../../../../components/Submit';
import styles from './AuthorizationPage.module.css';

export default function AuthorizationPage({ email, setStage }) {
  const [authNum, setAuthNum] = useState('');
  const [codeStyle, setCodeStyle] = useState('ready');
  const callAuthCode = async () => {
    const apiUrl = 'http://13.124.33.41:8081';
    const endpoint = '/v1/users/sendUser';
    const data = { email: email };
    try {
      const response = await axios.post(apiUrl + endpoint, data);
    } catch (e) {}
  };
  useEffect(() => {
    console.log('i fire once');
    callAuthCode();
  }, []);
  async function codeCheck(input) {
    const apiUrl = 'http://13.124.33.41:8081';
    const endpoint = '/v1/users/certifyUser';
    const data = { email: email, authNum: input };
    console.log(data);
    if (input?.length === 0) {
      return 'ready';
    } else {
      try {
        const response = await axios.post(apiUrl + endpoint, data);
        console.log(response);
        if (response.data.isSuccess) {
          console.log('right');
          return 'right';
        } else {
          return 'wrong';
        }
      } catch (e) {
        console.log(e.response.data);
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
            classNameCheck={codeCheck}
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
          onClick={() => setStage((prev) => prev + 1)}
        />
      </div>
    </div>
  );
}
