import { Outlet, useLocation } from 'react-router-dom';

import { Navbar, Sidebar } from '@/components';
import { findRouteByPath } from '@/utils';
import { routeList } from '@/router.js';

import styles from './App.module.css';

function App() {
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;

  return (
    <div className={styles.app}>
      <Outlet />
      {!hideNav && <Navbar />}
      <Sidebar />
    </div>
  );
}

export default App;
