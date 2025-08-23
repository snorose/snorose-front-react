import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@/shared/component';
import { NAVBAR_MENUS } from '@/shared/constant';

import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { getUnreadAlertCount } from '@/apis/alert';
import { useAuth } from '@/shared/hook';

export default function Navbar() {
  const { pathname } = useLocation();
  const [unreadAlertCount, setUnreadAlertCount] = useState(0);
  const { status } = useAuth();

  const isActive = ({ id, to }) =>
    pathname === to ||
    (id === 'home' && pathname === '/') ||
    (id === 'test' && pathname.startsWith('/board/exam-review/search'));

  // 폴링 로직
  useEffect(() => {
    if (status !== 'authenticated') return; // 로그인이 안 되어 있으면 API를 호출하지 않음

    let alive = true; // 비동기 작업이 끝났을 때 컴포넌트가 이미 언마운트 상태인지 체크하기 위한 취소 플래그

    async function loadUnread() {
      try {
        const count = await getUnreadAlertCount();
        if (alive) setUnreadAlertCount(count);
      } catch (e) {
        console.error('알림 개수 불러오기 실패:', e);
        if (alive) setUnreadAlertCount(0);
      }
    }

    loadUnread(); // 마운트 직후 1회 즉시 호출해서 첫 렌더에서 값이 비어 있지 않도록 함
    const interval = setInterval(loadUnread, 30000); // 30초마다 loadUnread를 호출하는 폴링 타이머

    // 언마운트 시 clean-up
    return () => {
      alive = false;
      clearInterval(interval); // 폴링 중단 -> 타이머 누수 방지
    };
  }, [status]);

  return (
    <nav className={styles.nav}>
      <ul className={styles.menus}>
        {NAVBAR_MENUS &&
          NAVBAR_MENUS.map(({ id, to, label, ...props }) => (
            <Link key={id} to={to}>
              <li className={styles.menu}>
                <div className={styles.iconWrapper}>
                  <Icon
                    id={isActive({ id, to }) ? `${id}-fill` : id}
                    {...props}
                  />
                  {id === 'bell' && unreadAlertCount > 0 && (
                    <div className={styles.badge}>
                      <span>
                        {unreadAlertCount > 99 ? '99+' : unreadAlertCount}
                      </span>
                    </div>
                  )}
                </div>
                <span
                  style={{
                    color: isActive({ id, to }) ? '#00368E' : '#5F86BF',
                  }}
                >
                  {label}
                </span>
              </li>
            </Link>
          ))}
      </ul>
    </nav>
  );
}
