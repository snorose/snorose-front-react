import { Link } from 'react-router-dom';

import { FetchLoading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';
import { Target } from '@/components/Target';

import styles from '@/pages/ExamReviewPage/ExamReviewPage/ExamReviewPage.module.css';

export default function ExamReviewSearchList({ result }) {
  const { data, ref, isLoading, isError, error } = result || {};
  const pages = data?.pages || [];
  const searchList = pages.flatMap((page) => page);

  if (isLoading) {
    return <FetchLoading>검색 중</FetchLoading>;
  }

  if (isError) {
    if (error.response.status === 404) {
      return <div className={styles.error}>검색 결과가 없습니다</div>;
    }

    return <div className={styles.error}>잠시 후 다시 시도해 주세요</div>;
  }

  return (
    <>
      <ul className={styles.list}>
        {searchList.map((post) => (
          <Link
            className={styles.to}
            key={post.postId}
            to={`/board/exam-review/post/${post.postId}`}
          >
            <PostBar data={post} hasLike={false} />
          </Link>
        ))}
      </ul>
      {searchList.length > 0 && <Target ref={ref} height='100px' />}
    </>
  );
}
