import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLogin } from '@/apis';

import { Button, Icon, Input } from '@/shared/component';

import snoroseLogo from '@/assets/images/snoroseLogo.svg';

import styles from './LoginPage.module.css';

export default function Login() {
  const navigate = useNavigate();
  const login = useLogin();
  const [formData, setFormData] = useState({ loginId: '', password: '' });
  const [isError, setIsError] = useState(false);
  const [visBtnClick, setVisBtnClick] = useState(false);
  const toggleVisBtn = () => {
    setVisBtnClick((prev) => !prev);
  };

  return (
    <div className={styles.loginframe}>
      <form onSubmit={(e) => login(e, setIsError, formData, navigate)}>
        <div className={styles.loginBody}>
          <Icon
            className={styles.back}
            id='arrow-left'
            width={19}
            height={17}
            onClick={() => {
              //BackAppBar 사용 불가 -> 로그인페이지에서 findId/findPw했다가 다시 돌아오면 다시는 main으로 못 돌아가는 루프구조가 되어버림
              navigate('/');
            }}
          />
          <img src={snoroseLogo} alt='스노로즈 로고' className={styles.logo} />
          <p className={styles.title}>
            숙명인을 위한 커뮤니티,
            <br />
            스노로즈에 오신 것을 환영합니다!
          </p>
          <div
            className={styles.input}
            onChange={() => {
              setIsError(false);
            }}
          >
            <Input
              placeholder={'아이디'}
              className={isError ? 'wrong' : 'ready'}
              inputType={'loginId'}
              inputData={setFormData}
            />
          </div>
          <div
            className={!isError ? styles.input : undefined}
            onChange={() => {
              setIsError(false);
            }}
          >
            <div
              className={`${styles.pwFrame} ${styles[isError ? 'wrong' : 'ready']}`}
            >
              <Input
                type={visBtnClick ? 'text' : 'password'}
                placeholder={'영어, 숫자, 특수문자를 포함한 비밀번호'}
                className={isError ? 'wrong' : 'ready'}
                inputType={'password'}
                inputData={setFormData}
              />
              {formData.password && (
                <Icon
                  id={visBtnClick ? 'closed-eye' : 'opened-eye'}
                  fill={isError ? '#ff4b6c' : '#898989'}
                  width={18}
                  height={13}
                  className={styles.visibility}
                  onClick={toggleVisBtn}
                />
              )}
            </div>
          </div>
          <Button btnName='로그인하기' className='right' />
          <div className={styles.find}>
            <Link to='/find-id'>아이디 찾기</Link>
            <p className={styles.divider}>|</p>
            <Link to='/find-pw'>비밀번호 찾기</Link>
          </div>
          <div className={styles.signUp}>
            <Link to='/signup'>아직 회원이 아니신가요?</Link>
            <Icon id='angle-right' width={16} height={16} />
          </div>
        </div>
      </form>
    </div>
  );
}
