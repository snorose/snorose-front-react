import { useEffect, useMemo } from 'react';
import styles from './ActivityPage.module.css';
import { BackAppBar, PostBar, Sponsor } from '@/components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPostList } from '@/apis';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { getBoardTextId } from '@/utils';
import frustratedWomanIllustration from '@/assets/images/frustratedWoman.svg';

export default function MyPostPage() {
  const { ref, inView } = useInView();

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['getMyPostList'],
      queryFn: ({ pageParam }) => getMyPostList({ page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return lastPage.length > 0 ? lastPageParam + 1 : undefined;
      },
    });

  const myPostList = useMemo(() => {
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
          <h1 className={styles.title}>내가 쓴 글</h1>
        </div>

        <article className={styles.contentListContainer}>
          {myPostList.length > 0 ? (
            myPostList.map((post, index) => (
              <Link
                key={post.postId}
                ref={index === myPostList.length - 2 ? ref : undefined}
                to={`/board/${getBoardTextId(post.boardId)}/post/${post.postId}`}
              >
                <PostBar data={post} />
              </Link>
            ))
          ) : (
            <div className={styles.noContentWrapper}>
              <p className={styles.noContentMessage}>아직 작성한 글이 없어요</p>
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
