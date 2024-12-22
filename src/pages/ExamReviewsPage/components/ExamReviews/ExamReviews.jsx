import { Link } from 'react-router-dom';

import { getReviews } from '@/apis';
import { useSuspensePagination } from '@/hooks';
import { FetchLoading, PostBar, PTR } from '@/components';
import { deduplicatePaginatedData, flatPaginationCache } from '@/utils';
import { QUERY_KEY, STALE_TIME } from '@/constants';

import styles from './ExamReviews.module.css';

export default function ExamReviews({ saveScrollPosition }) {
  const { data, ref, isFetching, refetch } = useSuspensePagination({
    queryKey: [QUERY_KEY.posts, 32],
    queryFn: ({ pageParam }) => getReviews(pageParam),
    staleTime: STALE_TIME.examReview,
  });

  const reviewList = deduplicatePaginatedData(flatPaginationCache(data));

  return (
    <PTR onRefresh={() => refetch().then(() => console.log('Refreshed!'))}>
      <ul className={styles.list}>
        {reviewList.map((post, index) => (
          <Link
            className={styles.to}
            ref={index === reviewList.length - 1 ? ref : undefined}
            key={post.postId}
            to={`/board/exam-review/post/${post.postId}`}
            onClick={saveScrollPosition}
          >
            <PostBar data={post} hasLike={false} />
          </Link>
        ))}
        {isFetching && <FetchLoading />}
      </ul>
    </PTR>
  );
}
