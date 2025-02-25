import { useNavigate } from 'react-router-dom';

import { Icon } from '@/components/Icon';

import styles from './CloseAppBar.module.css';

export default function CloseAppBar({
  alignRight,
  children,
  stroke = 'black',
  onClose,
  notFixed,
  backgroundColor,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.appBar}
      style={{
        justifyContent: `${alignRight ? 'flex-end' : 'space-between'}`,
        backgroundColor: backgroundColor ? backgroundColor : '#fff',
        position: notFixed ? 'relative' : 'fixed',
      }}
    >
      <Icon
        className={styles.close}
        id='x'
        width={22}
        height={22}
        onClick={onClose ? onClose : () => navigate(-1)}
        stroke={stroke}
      />
      <div className={styles.actions}>{children}</div>
    </div>
  );
}
