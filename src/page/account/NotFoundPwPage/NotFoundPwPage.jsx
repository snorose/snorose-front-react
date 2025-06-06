import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BackAppBar, Button } from '@/shared/component';

import styles from './NotFoundPwPage.module.css';

import { taskFailedIllustration } from '@/assets/illustrations';

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
      <BackAppBar backNavTo='/login' />
      <div className={styles.pageTopFrame}>
        <p className={styles.pageTitle}>비밀번호 찾기</p>
        <p className={styles.pageExplanation}>
          입력하신 정보와 일치하는 정보가 없어요
        </p>
      </div>
      <div className={styles.pageMiddleFrame}>
        <img
          src={taskFailedIllustration}
          alt='비밀번호 찾기 실패를 알리는 일러스트'
          className={styles.illustration}
        />
      </div>
      <div className={styles.pageBottomFrame}>
        <Link to='/find-pw'>
          <div className={styles.goBackButton}>
            <Button btnName='뒤로가기' className='ready' />
          </div>
        </Link>
        <Link to='/login'>
          <div className={styles.loginButton}>
            <Button btnName='로그인하기' className='right' />
          </div>
        </Link>
      </div>
    </div>
  );
}
