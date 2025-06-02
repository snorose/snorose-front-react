import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { Navbar, Sidebar } from '@/shared/component';
import { findRouteByPath } from '@/shared/lib';

import { PushNotificationManager } from '@/feature/alert/lib';

import { routeList } from '@/router.js';

import styles from './App.module.css';

import {
  MAINTENANCE_START,
  MAINTENANCE_END,
} from '@/feature/maintenance/hook/useMaintenance';
import { MaintenancePage } from './page/maintenance';

function App() {
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;
  const { status } = useAuth();

  const [token, setToken] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      /**
       * TODO: 푸시 알림 테스트 용으로 token을 저장했기 때문에 실제 배포 시에는 삭제 필요
       */
      PushNotificationManager.init().then((token) => setToken(token));
      PushNotificationManager.listenForegroundMessage();
    }
  }, [status]);

  const now = new Date(); // 서버 점검 페이지
  const isMaintenance = now >= MAINTENANCE_START && now <= MAINTENANCE_END;

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className={styles.app}>
      <div
        style={{
          overflowWrap: 'break-word',
        }}
      >
        {token}
      </div>
      <Outlet />
      {!hideNav && <Navbar />}
      <Sidebar />
    </div>
  );
}

export default App;
