import { useNavigate } from 'react-router-dom';
import { Icon } from '../../Icon';
import styles from './CloseAppBar.module.css';

export default function CloseAppBar({ alignRight, children }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.appBar}
      style={{ justifyContent: `${alignRight ? 'flex-end' : 'space-between'}` }}
    >
      <Icon
        className={styles.close}
        id='x'
        width={31}
        height={31}
        onClick={() => navigate(-1)}
      />
      <div className={styles.actions}>{children}</div>
    </div>
  );
}
