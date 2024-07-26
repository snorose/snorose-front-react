import { Link, useLocation } from 'react-router-dom';
import { NAVBAR_MENUS } from '../../constants';
import Icon from '../Icon/Icon';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const currentMenu = pathname.split('/')[1];
  const getCurrentMenuColor = (id, pointColor, defaultColor) =>
    id === currentMenu || (currentMenu === '' && id === 'home')
      ? pointColor
      : defaultColor;

  return (
    <nav className={styles.nav}>
      <ul className={styles.menus}>
        {NAVBAR_MENUS &&
          NAVBAR_MENUS.map(({ id, label, fill, ...props }) => (
            <Link key={id} to={`/${id}`}>
              <li className={styles.menu}>
                <Icon
                  id={id}
                  fill={getCurrentMenuColor(id, '#00368E', '#BFD7EC')}
                  stroke={getCurrentMenuColor(id, '#00368E', '#BFD7EC')}
                  {...props}
                />
                <span
                  style={{
                    color: getCurrentMenuColor(id, '#00368E', '#5F86BF'),
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
