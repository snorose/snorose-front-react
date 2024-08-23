import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

import { findRouteByPath } from './utils/findRoute.js';
import { routeList } from './route.js';

import styles from './App.module.css';
import { RecoilRoot } from 'recoil';

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
