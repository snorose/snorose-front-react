import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { List } from '@/components/Sidebar';
import { Icon } from '@/components/Icon';

import { NOT_LOGIN_MENUS, SIDEBAR_MENUS } from '@/constants';
import { USER } from '@/dummy/data';

import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, setIsOpen }) {
  const MENUS = USER.isLogin
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
    <div className={styles.dim}>
      <aside onClick={handleEventPropagation} className={styles.sidebar}>
        <Link className={styles.logo} to='/'>
          <Icon id='logo' width={129} height={23} margin={10} />
        </Link>
        {MENUS &&
          MENUS.map(({ to, title, items }) => (
            <div key={title}>
              <Link to={to}>
                <h3 className={styles.title}>{title}</h3>
              </Link>
              <List className={styles.item} items={items} />
            </div>
          ))}
      </aside>
    </div>
  );
}
