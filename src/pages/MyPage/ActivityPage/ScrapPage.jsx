import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getMyScrapPostList } from '@/apis';

import { BackAppBar, PostBar, Sponsor } from '@/components';

import { getBoardTitleToTextId } from '@/utils';

import frustratedWomanIllustration from '@/assets/images/frustratedWoman.svg';

import styles from './ActivityPage.module.css';

export default function ScrapPage() {
  const { ref, inView } = useInView();

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['getMyScrapPostList'],
      queryFn: ({ pageParam }) => getMyScrapPostList({ page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return lastPage.length > 0 ? lastPageParam + 1 : undefined;
      },
    });

  const myScrapPostList = useMemo(() => {
    return data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];
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
          <h1 className={styles.title}>스크랩</h1>
        </div>

        <article className={styles.contentListContainer}>
          {myScrapPostList.length > 0 ? (
            myScrapPostList.map((post, index) => (
              <Link
                key={post.postId}
                ref={index === myScrapPostList.length - 2 ? ref : undefined}
                to={`/board/${getBoardTitleToTextId(post.boardName)}/post/${post.postId}`}
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
                  alt='frustrated woman image'
                  className={styles.image}
                />
              </div>
            </div>
          )}
        </article>
      </section>

      <div className={styles.sponsor}>
        <Sponsor className={styles.sponsorImage} />
      </div>
    </main>
  );
}
