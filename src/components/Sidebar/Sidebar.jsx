import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NOT_LOGIN_MENUS, SIDEBAR_MENUS } from '../../constants';
import List from './List/List';
import styles from './Sidebar.module.css';

const isLogin = true;

export default function Sidebar({ isOpen, setIsOpen }) {
  const [FIRST_MENU, ...MENUS] = isLogin
    ? SIDEBAR_MENUS
    : SIDEBAR_MENUS.filter((menu) => NOT_LOGIN_MENUS.includes(menu.title));
  const handleEventPropagation = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const close = () => setIsOpen(false);

    if (isOpen) {
      document.addEventListener('click', close);
    }

    return () => {
      document.removeEventListener('click', close);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <aside onClick={handleEventPropagation} className={styles.sidebar}>
      <Link to={FIRST_MENU.to}>
        <h1 className={`${styles.title} ${styles.logo}`}>{FIRST_MENU.title}</h1>
      </Link>
      <List items={FIRST_MENU.items} />
      {MENUS &&
        MENUS.map(({ to, title, items }) => (
          <div key={title}>
            <Link to={to}>
              <h3 className={styles.title}>{title}</h3>
            </Link>
            <List items={items} />
          </div>
        ))}
    </aside>
  );
}
