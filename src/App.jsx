import { Outlet, useLocation } from 'react-router-dom';

import { Navbar, Sidebar } from '@/shared/component';
import { findRouteByPath } from '@/shared/lib';

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

  const now = new Date(); // 서버 점검 페이지
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
