import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import {
  GrowthBookProvider,
  useFeatureIsOn,
} from '@growthbook/growthbook-react';

import { useAuth } from '@/shared/hook';
import { Navbar, Sidebar } from '@/shared/component';
import { growthbook, findRouteByPath } from '@/shared/lib';

import { PushNotificationManager } from '@/feature/alert/lib';

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
  const { status } = useAuth();

  useEffect(() => {
    // Load features asynchronously when the app renders
    growthbook.init({ streaming: true });
  }, []);

  useEffect(() => {
    if (isEnabled && status === 'authenticated') {
      PushNotificationManager.init();
      PushNotificationManager.listenForegroundMessage();
    }
  }, [isEnabled, status]);

  const now = new Date(); // 서버 점검 페이지
  const isMaintenance = now >= MAINTENANCE_START && now <= MAINTENANCE_END;

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <div className={styles.app}>
        <Outlet />
        {!hideNav && <Navbar />}
        <Sidebar />
      </div>
    </GrowthBookProvider>
  );
}

export default App;
