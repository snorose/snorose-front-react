import React, { useEffect, useMemo } from 'react';
import styles from './ActivityPage.module.css';
import Icon from '@/components/Icon/Icon';
import { BackAppBar } from '@/components/AppBar';
import { PostBar } from '@/components/PostBar';
import { Sponser } from '@/components/Sponser';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getMyReviewFileList } from '@/apis';
// import { Link } from 'react-router-dom';
// import { getBoardTextId } from '@/utils';

export default function DownloadExamReviewPage() {
  const { inView } = useInView();
  // const { ref, inView } = useInView();

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['getMyReviewFileList'],
      queryFn: ({ page = 0 }) => getMyReviewFileList({ page }),
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
              // <Link
              //   ref={index === myReviewFileList.length - 2 ? ref : undefined}
              //   to={`/board/${getBoardTextId(post.boardId)}/post/${post.postId}`}
              // >
              <PostBar key={index} data={post} />
              // </Link>
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
