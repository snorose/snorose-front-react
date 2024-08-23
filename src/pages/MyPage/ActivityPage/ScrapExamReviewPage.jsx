import { useEffect, useMemo } from 'react';
import styles from './ActivityPage.module.css';
import Icon from '@/components/Icon/Icon';
import { BackAppBar } from '@/components/AppBar';
import { PostBar } from '@/components/PostBar';
import { Sponser } from '@/components/Sponser';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyScrapReviewList } from '@/apis';
import { useInView } from 'react-intersection-observer';
import { getBoardTitleToTextId } from '@/utils';
import { Link } from 'react-router-dom';

export default function ScrapExamReviewPage() {
  const { ref, inView } = useInView();

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['getMyScrapReviewList'],
      queryFn: ({ page = 0 }) => getMyScrapReviewList({ page }),
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return lastPage.length > 0 ? lastPageParam + 1 : undefined;
      },
    });

  const myScrapReviewList = useMemo(() => {
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
          <h1 className={styles.title}>시험 후기 스크랩</h1>
        </div>

        <article className={styles.contentListContainer}>
          {myScrapReviewList.length > 0 ? (
            myScrapReviewList.map((post, index) => (
              <Link
                ref={index === myScrapReviewList.length - 2 ? ref : undefined}
                to={`/board/${getBoardTitleToTextId(post.boardName)}/post/${post.postId}`}
              >
                <PostBar key={index} data={post} />{' '}
              </Link>
            ))
          ) : (
            <div className={styles.noContentWrapper}>
              <p className={styles.noContentMessage}>
                아직 스크랩한 시험 후기가 없어요
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
