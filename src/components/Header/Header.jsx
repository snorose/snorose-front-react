import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import { USER } from '../../dummy/data';
import styles from './Header.module.css';

export default function Header({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <Icon id='logo' width={151} height={27} />
        <Icon
          id='hamburger'
          width={23}
          height={16}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        />
        {!USER?.isLogin && (
          <Link to='/login' className={styles.login}>
            Login
          </Link>
        )}
      </header>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
