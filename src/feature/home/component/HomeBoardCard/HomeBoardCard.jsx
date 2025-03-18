import { Link } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { USER_STATUS } from '@/shared/constant';

import styles from './HomeBoardCard.module.css';

export default function HomeBoardCard({
  className,
  to,
  name,
  desc,
  backgroundImage,
}) {
  const { status } = useAuth();

  return (
    <Link className={`${styles.link} ${className}`} to={to}>
      <div
        className={styles.card}
        style={{
          backgroundImage: `${status === USER_STATUS.isLogin ? `url(${backgroundImage})` : ''}`,
        }}
      >
        <p
          className={`${styles.name} ${!status === USER_STATUS.isLogin && styles.notLogin}`}
        >
          {status === USER_STATUS.isLogin ? name : '로그인하세요'}
        </p>
        <p className={styles.desc}>
          {status === USER_STATUS.isLogin ? desc : `로그인 후\n이용 가능합니다`}
        </p>
      </div>
    </Link>
  );
}
