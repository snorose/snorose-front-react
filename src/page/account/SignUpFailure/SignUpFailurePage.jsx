import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BackAppBar, Button, Icon } from '@/shared/component';

import styles from './SignUpFailurePage.module.css';

export default function SignUpFailurePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    try {
      const checkAccess = state.message;
    } catch (e) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.pageFrame}>
      <BackAppBar />
      <div className={styles.pageTopFrame}>
        <p className={styles.pageTitle}>회원가입 실패</p>
        <p className={styles.pageExplanation}>{state?.message}</p>
      </div>
      <div className={styles.pageMiddleFrame}>
        <Icon id='star-alert' width={231} height={217} />
      </div>
      <div className={styles.pageBottomFrame}>
        <Link to='/signup'>
          <div className={styles.loginButton}>
            <Button btnName='뒤로가기' className='right' />
          </div>
        </Link>
      </div>
    </div>
  );
}
