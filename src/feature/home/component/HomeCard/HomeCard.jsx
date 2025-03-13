import { Link } from 'react-router-dom';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getHomeNotice } from '@/apis';

import { useAuth } from '@/shared/hook';
import { QUERY_KEY } from '@/shared/constant';

import styles from './HomeCard.module.css';

export default function HomeCard() {
  const { data: notice } = useSuspenseQuery({
    queryKey: [QUERY_KEY.homeNotice],
    queryFn: getHomeNotice,
    staleTime: 1000 * 60 * 5,
  });

  const { status } = useAuth();
  const isLogin = status === 'authenticated';

  return (
    <div className={styles.layout}>
      <Card
        className={styles.left}
        to='/board/notice'
        title={notice.title}
        tag='공지'
        icon={{
          id: isLogin ? 'blueMegaphone' : 'megaphone',
          mixBlendMode: isLogin ? 'color-burn' : 'luminosity',
          rotate: isLogin ? -34.271 : 34.27,
        }}
        isDark={isLogin ? false : true}
      />

      {isLogin && (
        <Card
          className={styles.right}
          to='/attendance'
          title={`오늘의\n출석체크`}
          tag='출석체크'
          icon={{ id: 'flag', mixBlendMode: 'luminosity' }}
          isDark
        />
      )}
    </div>
  );
}

function Card({ className, to, title, tag, icon, isDark }) {
  const { mixBlendMode, rotate } = icon;
  const imgSrc = icon?.id ? require(`@/assets/images/${icon.id}.svg`) : '';

  return (
    <Link className={`${className} ${isDark && styles.dark}`} to={to}>
      <div className={styles.card}>
        <div className={styles.text}>
          <span className={styles.title}>{title}</span>
          <span className={styles.tag}>[{tag}]</span>
        </div>
        <img
          className={styles.image}
          style={{ mixBlendMode, transform: `rotateZ(${rotate ?? 0}deg)` }}
          src={imgSrc}
          alt={icon.id}
        />
      </div>
    </Link>
  );
}
