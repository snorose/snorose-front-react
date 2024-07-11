import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Header.module.css';

const isLogin = false;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Icon
          id='hamburger'
          width={17}
          height={17}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        />
        {!isLogin && (
          <Link to='/login' className={styles.login}>
            Login
          </Link>
        )}
      </header>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
