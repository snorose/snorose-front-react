import { Link, useSearchParams } from 'react-router-dom';

import { getExamReviewList } from '@/apis';

import { useSuspensePagination } from '@/shared/hook';
import { deduplicatePaginatedData, flatPaginationCache } from '@/shared/lib';
import { FetchLoading, List, PullToRefresh } from '@/shared/component';
import { QUERY_KEY, STALE_TIME } from '@/shared/constant';

import { PostBar } from '@/feature/board/component';

import styles from './SearchExamReviewList.module.css';

export default function SearchExamReviewList({ saveScrollPosition }) {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsLength = Object.keys(params).length;

  const { data, ref, isFetching, refetch } = useSuspensePagination({
    queryKey: [QUERY_KEY.reviews, JSON.stringify(params)],
    queryFn: ({ pageParam }) =>
      getExamReviewList({
        page: pageParam,
        params,
      }),
    staleTime: STALE_TIME.searchList,
    enabled: paramsLength > 0,
  });

  const examList = deduplicatePaginatedData(flatPaginationCache(data));

  return (
    <PullToRefresh
      onRefresh={() => refetch().then(() => console.log('Refreshed!'))}
    >
      <List>
        {examList.map((post, index) => (
          <Link
            className={styles.to}
            ref={index === examList.length - 1 ? ref : undefined}
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
