import { Link } from 'react-router-dom';

import { Icon } from '../../components/Icon';
import { MenuIcon } from '../MenuIcon';
import styles from './Header.module.css';

import { USER } from '../../dummy/data';
import useAuth from '../../hooks/useAuth';

export default function Header({ className }) {
  const { logout } = useAuth();

  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <Icon id='logo' width={151} height={27} />
        <div className={styles.action}>
          {USER.isLogin ? (
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
