import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../Icon';
import { Sidebar } from '../Sidebar';

import styles from './BoardHeader.module.css';

export default function BoardHeader({ to, title, setIsSidebarOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link to={to} className={styles.back}>
            <Icon id='arrow-back' width={20} height={17} />
          </Link>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.right}>
          <Link to='/post-search'>
            <Icon id='search' width={16} height={16} fill='#00368E' />
          </Link>
          <Icon
            id='hamburger'
            width={22}
            height={15}
            className={styles.side_menu_btn}
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          />
        </div>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}

