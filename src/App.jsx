import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { Navbar, Sidebar } from '@/shared/component';
import { findRouteByPath } from '@/shared/lib';

import {
  subscribeToPushNotification,
  getNotificationPermissionSafely,
} from '@/feature/alert/lib';

import * as serviceWorker from '@/serviceWorkerRegistration';
import { routeList } from '@/router.js';

import styles from './App.module.css';

function App() {
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;
  const { status } = useAuth();

  useEffect(() => {
    serviceWorker.register();
  }, []);

  useEffect(() => {
    const setupPushNotifications = async () => {
      const granted = await getNotificationPermissionSafely();

      if (!granted) {
        return;
      }

      try {
        const registration = await serviceWorker.getRegistration();

        subscribeToPushNotification(registration);
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    };

    if (status === 'authenticated') {
      setupPushNotifications();
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
