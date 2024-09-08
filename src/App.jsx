import { Outlet, useLocation, useParams } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Navbar from '@/components/Navbar/Navbar';
import { findRouteByPath } from '@/utils/findRoute.js';
import { routeList } from '@/route.js';
import styles from './App.module.css';

function App() {
  const { pathname } = useLocation();
  const { keyword } = useParams();

  const checkedPath = keyword
    ? pathname.replace(`/search/:keyword?`, `/search/${keyword}`)
    : pathname;

  const currentRoute = findRouteByPath(checkedPath, routeList);
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
