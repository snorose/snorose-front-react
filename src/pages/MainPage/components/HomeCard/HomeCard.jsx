import { useSuspenseQuery } from '@tanstack/react-query';

import { getHomeNotice } from '@/apis';

import { useAuth } from '@/hooks';

import { Card } from '@/components';
import { QUERY_KEY } from '@/constants';

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
