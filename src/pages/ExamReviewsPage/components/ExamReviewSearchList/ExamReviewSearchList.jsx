import { Link } from 'react-router-dom';

import { FetchLoading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';
import { PTR } from '@/components';
import { deduplicatePaginatedData, flatPaginationCache } from '@/utils';

import styles from './ExamReviewSearchList.module.css';

export default function ExamReviewSearchList({ result, saveScrollPosition }) {
  const { data, ref, isLoading, isFetching, isError, error, refetch } = result;

  if (isLoading) {
    return <FetchLoading className={styles.loading}>검색 중</FetchLoading>;
  }

  if (isError) {
    if (error.response.status === 404) {
      return (
        <FetchLoading animation={false}>검색 결과가 없습니다</FetchLoading>
      );
    }

    return (
      <FetchLoading animation={false}>잠시 후 다시 시도해 주세요</FetchLoading>
    );
  }

  const searchList = deduplicatePaginatedData(flatPaginationCache(data));

  return (
    <PTR onRefresh={() => refetch().then(() => console.log('Refreshed!'))}>
      <ul className={styles.list}>
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
      </ul>
    </PTR>
  );
}
