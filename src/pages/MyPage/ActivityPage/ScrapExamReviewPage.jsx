import { Link } from 'react-router-dom';

import { getMyScrapReviewList } from '@/apis';

import { usePagination } from '@/hooks';

import { BackAppBar, FetchLoading, PostBar } from '@/components';

import frustratedWomanIllustration from '@/assets/images/frustratedWoman.svg';

import styles from './ActivityPage.module.css';

export default function ScrapExamReviewPage() {
  const { data, ref, isLoading, isError } = usePagination({
    queryKey: ['getMyScrapReviewList'],
    queryFn: ({ pageParam }) => getMyScrapReviewList({ page: pageParam }),
  });

  if (isLoading) {
    return <FetchLoading>불러오는 중</FetchLoading>;
  }

  if (isError) {
    return (
      <FetchLoading animation={false}>잠시 후 다시 시도해 주세요</FetchLoading>
    );
  }

  const myScrapReviewList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];

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
                key={post.postId}
                ref={index === myScrapReviewList.length - 1 ? ref : undefined}
                to={`/board/exam-review/post/${post.postId}`}
              >
                <PostBar data={post} hasLike={false} />
              </Link>
            ))
          ) : (
            <div className={styles.noContentWrapper}>
              <p className={styles.noContentMessage}>
                아직 스크랩한 시험 후기가 없어요
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
        </article>
      </section>
    </main>
  );
}
