import { useEffect, useState } from 'react';
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleRememberId = () => {
    setIsChecked((prev) => !prev);
  };

  const handleLoginSubmit = (e) => {
    if (isChecked) {
      localStorage.setItem('rememberedLoginId', formData.loginId);
    } else {
      localStorage.removeItem('rememberedLoginId');
    }

    login(e, setIsError, formData, navigate);
  };

  useEffect(() => {
    const savedId = localStorage.getItem('rememberedLoginId');

    if (savedId) {
      setFormData((prev) => ({ ...prev, loginId: savedId }));
      setIsChecked(true);
    }
  }, []);

  return (
    <div className={styles.loginframe}>
      <form onSubmit={handleLoginSubmit}>
        <div className={styles.loginBody}>
          <Icon
            className={styles.back}
            id='arrow-left'
            width={'1.8rem'}
            height={'1.6rem'}
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

          <div className={styles.inputWrapper}>
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
                value={formData.loginId}
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
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder={'영어, 숫자, 특수문자를 포함한 비밀번호'}
                  className={isError ? 'wrong' : 'ready'}
                  inputType={'password'}
                  inputData={setFormData}
                  value={formData.password}
                />
                {formData.password && (
                  <Icon
                    id={isPasswordVisible ? 'closed-eye' : 'opened-eye'}
                    fill={isError ? '#ff4b6c' : '#898989'}
                    width={24}
                    height={24}
                    className={styles.visibility}
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={styles.RememberIdCheckbox} onClick={toggleRememberId}>
            <Icon
              id={isChecked ? 'inactive-check-circle' : 'active-check-circle'}
              width={22}
              height={22}
            />
            <span>아이디 기억하기</span>
          </div>

          <Button btnName='로그인하기' className='right' />

          <div className={styles.find}>
            <Link to='/signup'>회원가입하기</Link>
            <p className={styles.divider}>|</p>
            <Link to='/find-id'>아이디 찾기</Link>
            <p className={styles.divider}>|</p>
            <Link to='/find-pw'>비밀번호 찾기</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
