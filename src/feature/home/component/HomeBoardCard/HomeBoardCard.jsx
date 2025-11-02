import { Link } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { USER_STATUS } from '@/shared/constant';

import lockImage from '@/assets/images/lock.svg';

import styles from './HomeBoardCard.module.css';

export default function HomeBoardCard({ className, path, name, mainImage }) {
  const { status } = useAuth();
  const isLogin = status === USER_STATUS.isLogin;

  const backgroundColors = {
    첫눈온방: 'var(--firstSnow-bg)',
    함박눈방: 'var(--largeSnow-bg)',
    만년설방: 'var(--permanentSnow-bg)',
    이벤트: 'var(--event-bg)',
  };
  const bgColor = backgroundColors[name] || 'var(--grey-1)';

  return (
    <Link className={`${styles.link} ${className}`} to={path}>
      <div className={styles.cardSection}>
        <div
          className={styles.card}
          style={{
            background: bgColor,
          }}
        >
          <img
            src={isLogin ? mainImage : lockImage}
            alt={name}
            className={isLogin ? styles.icon : ''}
          />
        </div>
        {isLogin ? <p className={styles.name}>{name}</p> : ''}
      </div>
    </Link>
  );
}
