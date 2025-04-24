import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BackAppBar, Button } from '@/shared/component';

import styles from './NotFoundIdPage.module.css';

import taskFailedIllustration from '@/assets/images/taskFailedIllustration.svg';

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
      <div>
        <div className={styles.explanation}>
          <p className={styles.pageTitle}>아이디 찾기</p>
          <p className={styles.pageExplanation}>
            입력하신 정보와 일치하는 정보가 없어요
          </p>
        </div>
      </div>
      <div className={styles.pageMiddleFrame}>
        <img
          src={taskFailedIllustration}
          alt='아이디 찾기 실패를 알리는 일러스트'
          className={styles.illust}
        />
      </div>
      <div className={styles.pageBottomFrame}>
        <Link to='/find-id'>
          <div className={styles.goBackButton}>
            <Button btnName='뒤로가기' className='wrong' />
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
