import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { NAVBAR_MENUS } from '../../constants';
import styles from './Navbar.module.css';

const NAVBAR_ = {
  home: 'home',
  board: 'board',
  'exam-review': 'test',
  alert: 'bell',
  'my-page': 'mypage',
};

export default function Navbar() {
  const { pathname } = useLocation();
  const currentMenu = pathname.split('/')[1];

  return (
    <nav className={styles.nav}>
      <ul className={styles.menus}>
        {NAVBAR_MENUS &&
          NAVBAR_MENUS.map(({ id, to, label, ...props }) => (
            <Link key={id} to={to}>
              <li className={styles.menu}>
                <Icon
                  id={id === NAVBAR_[currentMenu] ? `${id}-fill` : id}
                  {...props}
                />
                <span
                  style={{
                    color:
                      id === NAVBAR_[currentMenu] ||
                      (currentMenu === '' && id === 'home')
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
