import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useFeatureIsOn } from '@growthbook/growthbook-react';

import { Navbar, Sidebar } from '@/shared/component';
import { findRouteByPath } from '@/shared/lib';

import {
  isWebPushSupported,
  PushNotificationManager,
} from '@/feature/alert/lib';

import { routeList } from '@/router.js';

import styles from './App.module.css';

import {
  MAINTENANCE_START,
  MAINTENANCE_END,
} from '@/feature/maintenance/hook/useMaintenance';
import { MaintenancePage } from './page/maintenance';

function App() {
  const isEnabled = useFeatureIsOn('push-notification');
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;

  console.log(navigator.userAgent);
  console.log(navigator.userAgentData);
  console.log(navigator.serviceWorker);

  console.log(isWebPushSupported());

  // 푸시 알림 설정
  useEffect(() => {
    if (!isEnabled) return;

    PushNotificationManager.registerServiceWorker().catch((error) =>
      console.error(error)
    );
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
