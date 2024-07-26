import React, { useState } from 'react';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
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
      </header>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
