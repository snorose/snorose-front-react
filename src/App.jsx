import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Outlet />
      <Navbar />
    </div>
  );
}

export default App;
