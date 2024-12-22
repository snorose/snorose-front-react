import { Link } from 'react-router-dom';

import { FetchLoading, PostBar, PTR } from '@/components';
import { deduplicatePaginatedData, flatPaginationCache } from '@/utils';

import styles from './ExamReviews.module.css';

export default function ExamReviews({ result, saveScrollPosition }) {
  const { data, ref, isLoading, isFetching, isError, refetch } = result;

  if (isLoading) {
    return <FetchLoading className={styles.loading}>불러오는 중</FetchLoading>;
  }

  if (isError) {
    return (
      <FetchLoading animation={false}>
        시험후기를 불러오지 못했습니다.
      </FetchLoading>
    );
  }

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
