import { React, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/Icon/Icon';
import Submit from '../../../components/Submit/Submit';
import EnlightenedWoman from '../../../assets/images/EnlightenedWoman.svg';
import styles from './FoundPwPage.module.css';

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
      <div>
        <div className={styles.navFrame}>
          <Link to='/find-pw'>
            <Icon id='arrow-left' width='1.162rem' height='1.048rem' />
          </Link>
        </div>
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
            <Icon id='pencil-underline' width='24px' height='24px' />
          </div>
        </div>
      </div>
      <div className={styles.pageBottomFrame}>
        <div className={styles.bodyFrame}>
          <img
            src={EnlightenedWoman}
            alt='frustrated woman image'
            className={styles.img}
          />
        </div>
        <Link to='/find-pw'>
          <div className={styles.loginButton}>
            <Submit btnName='뒤로가기' className='right' />
          </div>
        </Link>
      </div>
    </div>
  );
}
