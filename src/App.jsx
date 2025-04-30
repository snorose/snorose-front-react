import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Navbar, Sidebar } from '@/shared/component';
import { findRouteByPath } from '@/shared/lib';

import * as serviceWorkerRegistration from '@/serviceWorkerRegistration';
import { routeList } from '@/router.js';
import styles from './App.module.css';

function App() {
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;

  const [token, setToken] = useState('');

  useEffect(() => {
    const test = async () => {
      const fcmToken = await serviceWorkerRegistration.register();
      setToken(fcmToken);
    };

    test();
  }, []);

  return (
    <div className={styles.app}>
      {token}
      <Outlet />
      {!hideNav && <Navbar />}
      <Sidebar />
    </div>
  );
}

export default App;
