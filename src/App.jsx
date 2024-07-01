import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className={styles.app}>
      <Outlet />
      <Navbar />
    </div>
  );
}

export default App;
