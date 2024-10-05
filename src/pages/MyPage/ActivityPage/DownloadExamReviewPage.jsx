import { Link } from 'react-router-dom';

import { getMyReviewFileList } from '@/apis';

import { usePagination } from '@/hooks';

import { BackAppBar, FetchLoading, PostBar } from '@/components';

import { QUERY_KEY } from '@/constants';
import frustratedWomanIllustration from '@/assets/images/frustratedWoman.svg';

import styles from './ActivityPage.module.css';

export default function DownloadExamReviewPage() {
  const { data, ref, isLoading, isFetching, isError, error } = usePagination({
    queryKey: [QUERY_KEY.myDownloadedExamReviews],
    queryFn: ({ pageParam }) => getMyReviewFileList({ page: pageParam }),
  });

  if (isLoading) {
    return <FetchLoading>불러오는 중</FetchLoading>;
  }

  if (isError) {
    const { message } = error.response.data;

    return <FetchLoading animation={false}>{message}</FetchLoading>;
  }

  const myReviewFileList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];

  return (
    <main className={styles.activityPage}>
      <header>
        <BackAppBar stroke='#000' backNavTo={'/my-page?tab=activity'} />
      </header>

      <section className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>다운받은 시험후기</h1>
        </div>

        <article className={styles.contentListContainer}>
          {myReviewFileList.length > 0 ? (
            myReviewFileList.map((post, index) => (
              <Link
                key={post.postId}
                ref={index === myReviewFileList.length - 1 ? ref : undefined}
                to={`/board/exam-review/post/${post.postId}`}
              >
                <PostBar data={post} hasLike={false} />
              </Link>
            ))
          ) : (
            <div className={styles.noContentWrapper}>
              <p className={styles.noContentMessage}>
                아직 다운받은 후기가 없어요
              </p>
              <div className={styles.imageWrapper}>
                <img
                  src={frustratedWomanIllustration}
                  alt='frustrated woman'
                  className={styles.image}
                />
              </div>
            </div>
          )}
          {isFetching && <FetchLoading />}
        </article>
      </section>
    </main>
  );
}
