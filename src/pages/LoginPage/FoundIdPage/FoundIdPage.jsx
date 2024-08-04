import { React, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/Icon/Icon';
import Submit from '../../../components/Submit/Submit';
import excitedWoman from '../../../assets/images/excitedWoman.svg';
import styles from './FoundIdPage.module.css';

export default function FoundIdPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [foundId, setFoundId] = useState('');
  useEffect(() => {
    try {
      setFoundId(state.loginId);
    } catch (e) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.pageFrame}>
      <div>
        <div className={styles.navFrame}>
          <Link to='/find-id'>
            <Icon id='arrow-left' width='1.162rem' height='1.048rem' />
          </Link>
        </div>
        <p className={styles.pageTitle}>아이디 찾기</p>
        <p className={styles.pageExplanation}>
          입력하신 정보와 일치하는 아이디는 다음과 같아요
        </p>
      </div>
      <div className={styles.pageBottomFrame}>
        <div className={styles.bodyFrame}>
          <div className={styles.resultFrame}>
            <span className={`${styles.dot} ${styles.first}`}></span>
            <span className={`${styles.dot} ${styles.second}`}></span>
            <span className={`${styles.dot} ${styles.third}`}></span>
            <p className={styles.result}>{foundId}</p>
          </div>
          <img
            src={excitedWoman}
            alt='frustrated woman image'
            className={styles.img}
          />
        </div>

        <Link to='/login'>
          <div className={styles.loginButton}>
            <Submit btnName='로그인하기' className='right' />
          </div>
        </Link>
        <Link to='/'>
          <div className={styles.findPWButton}>
            <p>비밀번호 찾기</p>
            <Icon id='arrow-right-grey' width='24px' height='24px' />
          </div>
        </Link>
      </div>
    </div>
  );
}
