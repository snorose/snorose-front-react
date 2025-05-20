import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { Navbar, Sidebar } from '@/shared/component';
import { findRouteByPath } from '@/shared/lib';

import { PushNotificationManager } from '@/feature/alert/lib/PushNotification';

import { routeList } from '@/router.js';

import styles from './App.module.css';

function App() {
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;
  const { status } = useAuth();

  useEffect(() => {
    if (status === 'authenticated') {
      PushNotificationManager.init();
    }
  }, [status]);

  return (
    <div className={styles.app}>
      <Outlet />
      {!hideNav && <Navbar />}
      <Sidebar />
    </div>
  );
}

export default App;
