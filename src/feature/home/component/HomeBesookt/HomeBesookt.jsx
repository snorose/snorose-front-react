import { Link } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getBest3 } from '@/apis';

import { QUERY_KEY } from '@/shared/constant';
import { getBoardTextId } from '@/shared/lib';
import { PostBar } from '@/feature/board/component';

import styles from './HomeBesookt.module.css';

export default function HomeBesookt({ className }) {
  const { data: besookts } = useSuspenseQuery({
    queryKey: [QUERY_KEY.best3],
    queryFn: getBest3,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className={`${styles.list} ${className}`}>
      {besookts.map((besookt) => (
        <Link
          key={`home-besookt-${besookt.boardId}-${besookt.postId}`}
          to={`/board/${getBoardTextId(besookt.boardId)}/post/${besookt.postId}`}
        >
          <PostBar data={besookt} />
        </Link>
      ))}
    </div>
  );
}
