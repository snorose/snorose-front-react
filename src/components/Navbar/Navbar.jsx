import React from 'react';
import { Link } from 'react-router-dom';
import { MENUS } from '../../constants';
import Icon from '../Icon/Icon';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menus}>
        {MENUS &&
          MENUS.map(({ id, label, ...props }) => (
            <Link to={`/${id}`}>
              <li className={styles.menu}>
                <Icon id={id} {...props} />
                <span>{label}</span>
              </li>
            </Link>
          ))}
      </ul>
    </nav>
  );
}
