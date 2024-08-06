import { useNavigate } from 'react-router-dom';
import { Icon } from '../../Icon';
import styles from './CloseAppBar.module.css';
import ActionButton from '../ActionButton/ActionButton';

export default function CloseAppBar({ alignRight, children, stroke, onClick }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.appBar}
      style={{ justifyContent: `${alignRight ? 'flex-end' : 'space-between'}` }}
    >
      <Icon
        className={styles.close}
        id='x'
        width={22}
        height={22}
        onClick={() => navigate(-1)}
        stroke={stroke}
      />
      <ActionButton
        className={styles.actions}
        children={children}
        onClick={onClick}
      />
    </div>
  );
}
