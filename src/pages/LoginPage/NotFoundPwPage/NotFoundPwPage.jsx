import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Submit } from '@/components/Submit';

import frustratedWoman from '@/assets/images/frustratedWoman.svg';

import styles from './NotFoundPwPage.module.css';
import { BackAppBar } from '@/components/index.js';

export default function NotFoundPwPage() {
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
      <BackAppBar />
      <div className={styles.pageTopFrame}>
        <p className={styles.pageTitle}>비밀번호 찾기</p>
        <p className={styles.pageExplanation}>
          입력하신 정보와 일치하는 정보가 없어요
        </p>
      </div>
      <div className={styles.pageBottomFrame}>
        <img
          src={frustratedWoman}
          alt='frustrated woman image'
          className={styles.img}
        />
        <Link to='/find-pw'>
          <div className={styles.goBackButton}>
            <Submit btnName='뒤로가기' className='ready' />
          </div>
        </Link>
        <Link to='/login'>
          <div className={styles.loginButton}>
            <Submit btnName='로그인하기' className='right' />
          </div>
        </Link>
      </div>
    </div>
  );
}
