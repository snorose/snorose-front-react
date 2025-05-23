import { Link } from 'react-router-dom';

import { FetchLoading, List, PullToRefresh } from '@/shared/component';
import { deduplicatePaginatedData, flatPaginationCache } from '@/shared/lib';

import { PostBar } from '@/feature/board/component';
import { useSearch } from '@/feature/search/hook';

import styles from './SearchExamReviewList.module.css';

export default function SearchExamReviewList({ saveScrollPosition }) {
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
