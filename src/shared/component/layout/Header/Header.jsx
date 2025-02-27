import { Link } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { Icon, MenuIcon } from '@/shared/component';

import styles from './Header.module.css';

export default function Header({ className }) {
  const { status, logout } = useAuth();

  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <Icon id='logo' width={151} height={27} />
        <div className={styles.action}>
          {status === 'authenticated' ? (
            <button className={styles.button} onClick={logout}>
              로그아웃
            </button>
          ) : (
            <Link className={styles.button} to='/login'>
              로그인
            </Link>
          )}
          <MenuIcon />
        </div>
      </header>
    </>
  );
}
