import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { NAVBAR_MENUS } from '../../constants';
import styles from './Navbar.module.css';

const NAVBAR_ID = {
  '/home': 'home',
  '/board': 'board',
  '/board/exam-review': 'test',
  // '/alert': 'bell',
  '/my-page': 'mypage',
};

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.menus}>
        {NAVBAR_MENUS &&
          NAVBAR_MENUS.map(({ id, to, label, ...props }) => (
            <Link key={id} to={to}>
              <li className={styles.menu}>
                <Icon
                  id={id === NAVBAR_ID[pathname] ? `${id}-fill` : id}
                  {...props}
                />
                <span
                  style={{
                    color:
                      id === NAVBAR_ID[pathname] ||
                      (pathname === '' && id === 'home')
                        ? '#00368E'
                        : '#5F86BF',
                  }}
                >
                  {label}
                </span>
              </li>
            </Link>
          ))}
      </ul>
    </nav>
  );
}
