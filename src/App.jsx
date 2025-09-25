import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useFeatureIsOn } from '@growthbook/growthbook-react';

import { findRouteByPath } from '@/shared/lib';
import { Navbar, Sidebar } from '@/shared/component';
import { QUERY_KEY } from '@/shared/constant';

import { PushNotificationManager } from '@/feature/alert/lib';

import {
  MAINTENANCE_START,
  MAINTENANCE_END,
} from '@/feature/maintenance/hook/useMaintenance';
import { MaintenancePage } from './page/maintenance';

import { routeList } from '@/router.js';

import styles from './App.module.css';

function App() {
  const queryClient = useQueryClient();
  const isEnabled = useFeatureIsOn('push-notification');
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;

  // 푸시 알림 설정
  useEffect(() => {
    if (!isEnabled) return;

    const listen = () => {
      console.log('listen');
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.notifications() });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.unreadNotificationCount,
      });
    };

    PushNotificationManager.registerServiceWorker()
      .then(() => PushNotificationManager.onForegroundMessage(listen))
      .catch((error) => console.error(error));
  }, [isEnabled]);

  // 서버 점검 페이지 처리
  const now = new Date();
  const isMaintenance = now >= MAINTENANCE_START && now <= MAINTENANCE_END;
  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className={styles.app}>
      <Outlet />
      {!hideNav && <Navbar />}
      <Sidebar />
    </div>
  );
}

export default App;
