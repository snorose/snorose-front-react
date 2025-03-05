import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@/shared/component';
import { NAVBAR_MENUS } from '@/shared/constant';

import styles from './Navbar.module.css';

export default function Navbar() {
  const { pathname } = useLocation();

  const isActive = ({ id, to }) =>
    pathname === to ||
    (id === 'home' && pathname === '/') ||
    (id === 'test' && pathname.startsWith('/board/exam-review/search'));

  return (
    <nav className={styles.nav}>
      <ul className={styles.menus}>
        {NAVBAR_MENUS &&
          NAVBAR_MENUS.map(({ id, to, label, ...props }) => (
            <Link key={id} to={to}>
              <li className={styles.menu}>
                <Icon
                  id={isActive({ id, to }) ? `${id}-fill` : id}
                  {...props}
                />
                <span
                  style={{
                    color: isActive({ id, to }) ? '#00368E' : '#5F86BF',
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
