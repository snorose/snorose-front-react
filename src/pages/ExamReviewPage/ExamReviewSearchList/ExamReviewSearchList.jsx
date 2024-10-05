import { Link } from 'react-router-dom';

import { FetchLoading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';

import styles from '@/pages/ExamReviewPage/ExamReviewPage/ExamReviewPage.module.css';

export default function ExamReviewSearchList({ result }) {
  const { data, ref, isLoading, isFetching, isError, error } = result || {};

  if (isLoading) {
    return <FetchLoading>검색 중</FetchLoading>;
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

  const searchList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];

  return (
    <ul className={styles.list}>
      {searchList.map((post, index) => (
        <Link
          className={styles.to}
          ref={index === searchList.length - 1 ? ref : undefined}
          key={post.postId}
          to={`/board/exam-review/post/${post.postId}`}
        >
          <PostBar data={post} hasLike={false} />
        </Link>
      ))}
      {isFetching && <FetchLoading />}
    </ul>
  );
}
