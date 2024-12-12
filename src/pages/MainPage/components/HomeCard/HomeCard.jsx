import { useQuery } from '@tanstack/react-query';

import { Card } from '@/components';
import { QUERY_KEY } from '@/constants';

import styles from './HomeCard.module.css';

export default function HomeCard({ callback, isLogin = true }) {
  const { data: notice } = useQuery({
    queryKey: [QUERY_KEY.homeNotice],
    queryFn: callback,
    staleTime: 1000 * 60 * 5,
    suspense: true,
  });

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
