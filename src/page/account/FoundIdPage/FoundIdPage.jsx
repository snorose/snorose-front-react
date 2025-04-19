import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BackAppBar, Button, Icon } from '@/shared/component';

import styles from './FoundIdPage.module.css';

import findIdPwSuccess from '@/assets/images/find-id-pw-success.svg';

export default function FoundIdPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  useEffect(() => {
    try {
      setEmail(state.email);
    } catch (e) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.pageFrame}>
      <BackAppBar backNavTo='/login' />
      <div className={styles.pageTopFrame}>
        <p className={styles.pageTitle}>아이디 찾기</p>
        <p className={styles.pageExplanation}>
          다음 이메일로 아이디를 전달했습니다.
        </p>
        <p className={styles.result}>{email}</p>
        <div className={styles.resultFrame}>
          <span className={`${styles.dot} ${styles.first}`}></span>
          <span className={`${styles.dot} ${styles.second}`}></span>
          <span className={`${styles.dot} ${styles.third}`}></span>
        </div>
      </div>
      <div className={styles.pageMiddleFrame}>
        <img src={findIdPwSuccess} alt='FoundId' className={styles.illust} />
      </div>
      <div className={styles.pageBottomFrame}>
        <Link to='/login'>
          <div className={styles.loginButton}>
            <Button btnName='로그인하기' className='right' />
          </div>
        </Link>
        <Link to='/find-pw'>
          <div className={styles.findPWButton}>
            <p>비밀번호 찾기</p>
            <Icon id='angle-right' width={24} height={24} />
          </div>
        </Link>
      </div>
    </div>
  );
}
