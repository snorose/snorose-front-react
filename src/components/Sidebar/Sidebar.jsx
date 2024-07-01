import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SIDEBAR_MENUS } from '../../constants';
import List from './List/List';
import styles from './Sidebar.module.css';

export default function Sidebar({ closeSidebar }) {
  const [FIRST_MENU, ...MENUS] = SIDEBAR_MENUS;
  const sidebarRef = useRef();

  useEffect(() => {
    const handleEventPropagation = (event) => {
      event.stopPropagation();
    };

    if (sidebarRef.current) {
      sidebarRef.current.addEventListener('click', handleEventPropagation);
      document.addEventListener('click', closeSidebar);
    }

    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, [closeSidebar]);

  return (
    <aside ref={sidebarRef} className={styles.sidebar}>
      <Link to={FIRST_MENU.to}>
        <h1>{FIRST_MENU.title}</h1>
      </Link>
      <List items={FIRST_MENU.items} />
      {MENUS &&
        MENUS.map(({ to, title, items }) => (
          <div key={title}>
            <Link to={to}>
              <h3>{title}</h3>
            </Link>
            <List items={items} />
          </div>
        ))}
    </aside>
  );
}
