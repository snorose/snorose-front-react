import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Icon } from '@/shared/component';

import styles from './SignUpSuccessPage.module.css';

import { taskCompleteIllustration } from '@/assets/illustrations';

export default function SignUpSuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    try {
      const checkAccess = state.access;
    } catch (e) {
      //navigate('/login');
    }
  }, []);

  return (
    <div className={styles.pageFrame}>
      <div>
        <Icon
          id='check-thick'
          width={'2.4rem'}
          height={'2.4rem'}
          className={styles.icon}
        />
        <p className={styles.title}>스노로즈 가입이 완료되었어요!</p>
        <p className={styles.explanation}>
          별도의 인증 절차 후<br />
          스노로즈 전체 서비스를 이용하실 수 있어요
        </p>
      </div>
      <div className={styles.img}>
        <img
          src={taskCompleteIllustration}
          alt='회원가입 성공을 알리는 일러스트'
          className={styles.illustration}
        />
      </div>

      <div>
        <div className={styles.submit}>
          <Button
            btnName='로그인하기'
            className={'right'}
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </div>
  );
}
