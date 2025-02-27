import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@/shared/component';
import { NOT_LOGIN_MENUS, SIDEBAR_MENUS } from '@/shared/constant';

import { useSidebarStore } from '@/stores';
import { useAuth } from '@/hooks';

import styles from './Sidebar.module.css';

export default function Sidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);
  const { status } = useAuth();

  const MENUS =
    status === 'authenticated'
      ? SIDEBAR_MENUS
      : SIDEBAR_MENUS.filter((menu) => NOT_LOGIN_MENUS.includes(menu.title));

  const handleEventPropagation = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
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
    <div className={styles.dim}>
      <aside onClick={handleEventPropagation} className={styles.sidebar}>
        <Link className={styles.logo} to='/'>
          <Icon id='logo' width={129} height={23} margin={10} />
        </Link>
        {MENUS.map(({ to, title, items }) => (
          <div key={title} onClick={close}>
            <Link to={to}>
              <h3 className={styles.title}>{title}</h3>
            </Link>
            <MenuList className={styles.menuList} items={items} />
          </div>
        ))}
      </aside>
    </div>
  );
}

function MenuList({ className, items }) {
  if (!items) return null;

  return (
    <ul className={styles.list}>
      {items.map(({ to, name }) => (
        <Link to={to} key={name} className={styles.item}>
          <li className={className}>{name}</li>
        </Link>
      ))}
    </ul>
  );
}
