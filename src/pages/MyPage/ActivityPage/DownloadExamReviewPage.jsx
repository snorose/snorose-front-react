import { useEffect, useMemo } from 'react';
import styles from './ActivityPage.module.css';
import { BackAppBar, Icon, PostBar, Sponser } from '@/components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getMyReviewFileList } from '@/apis';
import { Link } from 'react-router-dom';

export default function DownloadExamReviewPage() {
  const { ref, inView } = useInView();

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['getMyReviewFileList'],
      queryFn: ({ pageParam }) => getMyReviewFileList({ page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return lastPage.length > 0 ? lastPageParam + 1 : undefined;
      },
    });

  const myReviewFileList = useMemo(() => {
    return data ? data.pages.flatMap((page) => page) : [];
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return null;
  }

  return (
    <main className={styles.activityPage}>
      <header>
        <BackAppBar stroke='#000' />
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
                ref={index === myReviewFileList.length - 2 ? ref : undefined}
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
                <Icon id='no-review-star' className={styles.image} />
              </div>
            </div>
          )}
        </article>
      </section>

      <div className={styles.sponsor}>
        <Sponser className={styles.sponsorImage} />
      </div>
    </main>
  );
}
