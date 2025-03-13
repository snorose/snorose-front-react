import { useSuspenseQuery } from '@tanstack/react-query';

import { getBest3 } from '@/apis';

import { QUERY_KEY } from '@/shared/constant';

import { MainPageListItem } from '@/feature/home/component';

import styles from './HomeBesookt.module.css';

export default function HomeBesookt({ className }) {
  const { data: besookts } = useSuspenseQuery({
    queryKey: [QUERY_KEY.best3],
    queryFn: getBest3,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className={`${styles.list} ${className}`}>
      {besookts.map(
        ({
          boardId,
          postId,
          userDisplay,
          title,
          content,
          boardName,
          createdAt,
        }) => (
          <MainPageListItem
            key={postId}
            postId={postId}
            displayName={userDisplay}
            title={title}
            overview={content}
            boardId={boardId}
            boardName={boardName}
            createdAt={createdAt}
          />
        )
      )}
    </div>
  );
}
