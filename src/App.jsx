import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import {
  requestPermission,
  onMessageListener,
} from '@/feature/alert/lib/firebase-messaging';

import { Navbar, Sidebar } from '@/shared/component';
import { findRouteByPath } from '@/shared/lib';

import { routeList } from '@/router.js';
import styles from './App.module.css';

function App() {
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;

  useEffect(() => {
    requestPermission(); // 앱 실행 시 푸시 알림 권한 요청

    // 포그라운드 메시지 수신 이벤트 리스너 등록
    onMessageListener()
      .then((payload) => {
        console.log('포그라운드 메시지 수신', payload);
      })
      .catch((err) => console.log('메시지 수신 오류:', err));
  }, []);

  return (
    <div className={styles.app}>
      <Outlet />
      {!hideNav && <Navbar />}
      <Sidebar />
    </div>
  );
}

export default App;
