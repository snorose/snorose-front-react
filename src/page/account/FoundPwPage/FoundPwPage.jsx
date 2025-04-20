import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BackAppBar, Button } from '@/shared/component';

import styles from './FoundPwPage.module.css';

import emailSendIllustration from '@/assets/images/emailSendIllustration.svg';

export default function FoundPwPage() {
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
        <p className={styles.pageTitle}>비밀번호 찾기</p>
        <p className={styles.pageSubtitle}>
          비밀번호 초기화 이메일이 발송되었어요
        </p>
        <p className={styles.pageExplanation}>
          이메일을 받지 못하셨다면
          <br />
          스팸함을 확인해주세요
        </p>
        <div className={styles.resultFrame}>
          <span className={`${styles.dot} ${styles.first}`}></span>
          <span className={`${styles.dot} ${styles.second}`}></span>
          <span className={`${styles.dot} ${styles.third}`}></span>
          <div className={styles.result}>
            <p>{email}</p>
          </div>
        </div>
      </div>
      <div className={styles.pageMiddleFrame}>
        <img
          src={emailSendIllustration}
          alt='FoundPw'
          className={styles.illust}
        />
      </div>
      <div className={styles.pageBottomFrame}>
        <Link to='/find-pw'>
          <div className={styles.loginButton}>
            <Button btnName='뒤로가기' className='right' />
          </div>
        </Link>
      </div>
    </div>
  );
}
