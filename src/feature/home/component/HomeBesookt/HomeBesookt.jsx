import { useSuspenseQuery } from '@tanstack/react-query';

import { getBest3 } from '@/apis';

import { QUERY_KEY } from '@/shared/constant';

import styles from './HomeBesookt.module.css';
import { PostBar } from '@/feature/board/component';

export default function HomeBesookt({ className }) {
  const { data: besookts } = useSuspenseQuery({
    queryKey: [QUERY_KEY.best3],
    queryFn: getBest3,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className={`${styles.list} ${className}`}>
      {besookts.map((besookt) => (
        <PostBar
          key={`home-besookt-${besookt.boardId}-${besookt.postId}`}
          data={besookt}
        />
      ))}
    </div>
  );
}
