import { Outlet, useLocation } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import { Navbar } from '@/components/Navbar';

import { findRouteByPath } from '@/utils';

import { routeList } from '@/route.js';

import styles from './App.module.css';

function App() {
  const { pathname } = useLocation();
  const currentRoute = findRouteByPath(pathname, routeList);
  const hideNav = currentRoute?.meta?.hideNav ?? false;

  return (
    <RecoilRoot>
      <div className={styles.app}>
        <Outlet />
        {!hideNav && <Navbar />}
      </div>
    </RecoilRoot>
  );
}

export default App;
