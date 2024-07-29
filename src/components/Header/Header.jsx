import React from 'react';
import Icon from '../../components/Icon/Icon';
import styles from './Header.module.css';
import MenuIcon from '../MenuIcon/MenuIcon.jsx';

export default function Header({ className }) {
  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <Icon id='logo' width={151} height={27} />
        <MenuIcon />
      </header>
    </>
  );
}
