import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Icon } from '@/components/Icon';
import { Submit } from '@/components/Submit';

import excitedWoman from '@/assets/images/excitedWoman.svg';

import styles from './SignUpSuccessPage.module.css';

export default function SignUpSuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    try {
      const checkAccess = state.access;
    } catch (e) {
      navigate('/login');
    }
  }, []);
  return (
    <div className={styles.pageFrame}>
      <div>
        <Icon
          id='check-thick'
          width='1.5rem'
          height='1.5rem'
          className={styles.icon}
        />
        <p className={styles.title}>스노로즈 가입이 완료되었어요!</p>
        <p>
          별도의 인증 절차 후<br />
          스노로즈 전체 서비스를 이용하실 수 있어요
        </p>
      </div>
      <div>
        <div className={styles.img}>
          <img src={excitedWoman} alt='excitedWoman' />
        </div>

        <div className={styles.submit}>
          <Submit
            btnName='로그인하기'
            className={'right'}
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </div>
  );
}
