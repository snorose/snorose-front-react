import { Link } from 'react-router-dom';

import { useAuth } from '@/shared/hook';
import { USER_STATUS } from '@/shared/constant';

import lockImage from '@/assets/images/lock.svg';

import style from './HomeBoardCard.module.css';

export default function HomeBoardCard({
  className,
  to,
  name,
  desc,
  backgroundImage,
}) {
  const { status } = useAuth();

  return (
    <Link className={`${style.link} ${className}`} to={to}>
      <div
        className={style.card}
        style={{
          backgroundImage: `${status === USER_STATUS.isLogin ? `url(${backgroundImage})` : `url(${lockImage})`}`,
        }}
      >
        {status === USER_STATUS.isLogin && (
          <>
            <p className={style.name}>{name}</p>
            <p className={style.desc}>{desc}</p>
          </>
        )}
        {status !== USER_STATUS.isLogin && (
          <p className={style.notLogin}>{`로그인 후 이용해 주세요`}</p>
        )}
      </div>
    </Link>
  );
}
