import { Link } from 'react-router-dom';
import { USER } from '../../dummy/data';
import styles from './BoardCard.module.css';

export default function BoardCard({
  className,
  to,
  name,
  desc,
  backgroundImage,
}) {
  return (
    <Link className={`${styles.link} ${className}`} to={to}>
      <div
        className={styles.card}
        style={{
          backgroundImage: `${USER?.isLogin ? `url(${backgroundImage})` : ''}`,
        }}
      >
        <p className={`${styles.name} ${!USER?.isLogin && styles.notLogin}`}>
          {USER?.isLogin ? name : '로그인하세요'}
        </p>
        <p className={styles.desc}>
          {USER?.isLogin ? desc : `로그인 후\n이용 가능합니다`}
        </p>
      </div>
    </Link>
  );
}
