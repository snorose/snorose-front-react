import { Link } from 'react-router-dom';

import { useSearch } from '@/hooks';

import { FetchLoading, List, PullToRefresh } from '@/shared/component';
import { PostBar } from '@/components';
import { deduplicatePaginatedData, flatPaginationCache } from '@/utils';

import styles from './SearchExamReviews.module.css';

export default function SearchExamReviews({ saveScrollPosition }) {
  const { data, ref, isFetching, refetch } = useSearch({ boardId: 32 });
  const searchList = deduplicatePaginatedData(flatPaginationCache(data));

  return (
    <PullToRefresh
      onRefresh={() => refetch().then(() => console.log('Refreshed!'))}
    >
      <List>
        {searchList.map((post, index) => (
          <Link
            className={styles.to}
            ref={index === searchList.length - 1 ? ref : undefined}
            key={post.postId}
            to={`/board/exam-review/post/${post.postId}`}
            onClick={saveScrollPosition}
          >
            <PostBar data={post} hasLike={false} />
          </Link>
        ))}
        {isFetching && <FetchLoading />}
      </List>
    </PullToRefresh>
  );
}
