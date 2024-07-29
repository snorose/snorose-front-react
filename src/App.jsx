import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { MENU_WITHOUT_NAV } from './constants/menuWithoutNav';
import styles from './App.module.css';

function checkNav(location) {
  return !MENU_WITHOUT_NAV.includes(location);
}

function App() {
  const location = useLocation();
  const isNav = checkNav(location.pathname);
  return (
    <div className={styles.app}>
      <Outlet />
      {isNav && <Navbar />}
    </div>
  );
}

export default App;
