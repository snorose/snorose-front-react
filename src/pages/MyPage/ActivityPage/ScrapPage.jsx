import { Link } from 'react-router-dom';

import { getMyScrapPostList } from '@/apis';

import { usePagination, useScrollRestoration } from '@/hooks';

import { BackAppBar, FetchLoading, PostBar } from '@/components';

import { getBoardTitleToTextId } from '@/utils';

import { QUERY_KEY, STALE_TIME } from '@/constants';
import frustratedWomanIllustration from '@/assets/images/frustratedWoman.svg';

import styles from './ActivityPage.module.css';

export default function ScrapPage() {
  const { data, ref, isLoading, isFetching, isError, error } = usePagination({
    queryKey: [QUERY_KEY.myScrappedPosts],
    queryFn: ({ pageParam }) => getMyScrapPostList({ page: pageParam }),
    staleTime: STALE_TIME.mypageActivity,
  });

  const { scrollRef, saveScrollPosition } = useScrollRestoration();

  if (isLoading) {
    return <FetchLoading>불러오는 중</FetchLoading>;
  }

  if (isError) {
    const { message } = error.response.data;

    return <FetchLoading animation={false}>{message}</FetchLoading>;
  }

  const myScrapPostList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];

  return (
    <main className={styles.activityPage} ref={scrollRef}>
      <header>
        <BackAppBar stroke='#000' backNavTo={'/my-page?tab=activity'} />
      </header>

      <section className={styles.contentWrapper}>
        <div className={styles.topContainer}>
          <h1 className={styles.title}>스크랩</h1>
        </div>

        <article className={styles.contentListContainer}>
          {myScrapPostList.length > 0 ? (
            myScrapPostList.map((post, index) => (
              <Link
                key={post.postId}
                ref={index === myScrapPostList.length - 2 ? ref : undefined}
                to={`/board/${getBoardTitleToTextId(post.boardName)}/post/${post.postId}`}
                state={{ from: '/my-page/scrap' }}
                onClick={saveScrollPosition}
              >
                <PostBar data={post} />
              </Link>
            ))
          ) : (
            <div className={styles.noContentWrapper}>
              <p className={styles.noContentMessage}>
                아직 스크랩 한 글이 없어요
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
