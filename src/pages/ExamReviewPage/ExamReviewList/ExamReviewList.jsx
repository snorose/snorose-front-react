import { Link } from 'react-router-dom';

import { FetchLoading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';
import { Target } from '@/components/Target';

import styles from '@/pages/ExamReviewPage/ExamReviewPage/ExamReviewPage.module.css';

export default function ExamReviewList({ result }) {
  const { data, ref, isLoading, isError, error } = result;

  const reviewList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  if (isLoading) {
    return <FetchLoading>불러오는 중</FetchLoading>;
  }

  if (isError) {
    if (error.response.status === 404) {
      return;
    }

    return <div className={styles.error}>잠시 후 다시 시도해 주세요</div>;
  }

  return (
    <>
      <ul className={styles.list}>
        {reviewList.map((post) => (
          <Link
            className={styles.to}
            key={post.postId}
            to={`/board/exam-review/post/${post.postId}`}
          >
            <PostBar data={post} hasLike={false} />
          </Link>
        ))}
      </ul>
      {reviewList.length > 0 && <Target ref={ref} height='100px' />}
    </>
  );
}
