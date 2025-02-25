import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BackAppBar, Submit } from '@/shared/component';
import { Icon } from '@/components/Icon';

import styles from './NotFoundIdPage.module.css';

export default function NotFoundIdPage() {
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
      <BackAppBar backNavTo='/login' classname={styles.backAppBar} />
      <div className={styles.pageTopFrame}>
        <div className={styles.explanation}>
          <p className={styles.pageTitle}>아이디 찾기</p>
          <p className={styles.pageExplanation}>
            입력하신 정보와 일치하는 정보가 없어요
          </p>
        </div>
      </div>
      <div className={styles.pageMiddleFrame}>
        <Icon
          id='star-alert'
          className={styles.starAlert}
          width={231}
          height={217}
        />
      </div>
      <div className={styles.pageBottomFrame}>
        <Link to='/find-id'>
          <div className={styles.goBackButton}>
            <Submit btnName='뒤로가기' className='wrong' />
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
