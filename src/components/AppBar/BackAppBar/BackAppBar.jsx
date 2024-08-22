import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Icon } from '../../Icon';
import { MenuIcon } from '../../MenuIcon';
import styles from './BackAppBar.module.css';

export default function BackAppBar({
  title,
  hasMenu,
  hasSearch,
  children,
  hasSearchInput,
  isDark,
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={hasSearchInput ? styles.hasGap : styles.appBar}>
      <div className={styles.backDiv}>
        <Icon
          className={styles.back}
          id='arrow-left'
          width={19}
          height={17}
          fill={isDark && 'white'}
          onClick={() => navigate(-1)}
        />
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <div className={hasSearchInput ? styles.hasWideWidth : styles.actions}>
        {hasSearch && (
          <Link to={`${pathname}/search`}>
            <Icon id='search-thick' width={19} height={19} stroke='#00368E' />
          </Link>
        )}
        {hasMenu && <MenuIcon />}
        {children}
      </div>
    </div>
  );
}
