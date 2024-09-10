import { useEffect, useMemo } from 'react';
import styles from './ActivityPage.module.css';
import { BackAppBar, Icon, PostBar, Sponsor } from '@/components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyCommentList } from '@/apis';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { getBoardTextId } from '@/utils';
import frustratedWomanIllustration from '@/assets/images/frustratedWoman.svg';

export default function CommentPage() {
  const { ref, inView } = useInView();

  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['getMyCommentList'],
      queryFn: ({ pageParam }) => getMyCommentList({ page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return lastPage.length > 0 ? lastPageParam + 1 : undefined;
      },
    });

  const myCommentList = useMemo(() => {
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
          <h1 className={styles.title}>댓글 단 글</h1>
        </div>

        <article className={styles.contentListContainer}>
          {myCommentList.length > 0 ? (
            myCommentList.map((post, index) => (
              <Link
                key={post.postId}
                ref={index === myCommentList.length - 2 ? ref : undefined}
                to={`/board/${getBoardTextId(post.boardId)}/post/${post.postId}`}
              >
                <PostBar data={post} />
              </Link>
            ))
          ) : (
            <div className={styles.noContentWrapper}>
              <p className={styles.noContentMessage}>
                아직 작성한 댓글이 없어요
              </p>
              <div className={styles.imageWrapper}>
                <img
                  className={styles.image}
                  src={frustratedWomanIllustration}
                  alt='frustrated woman'
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
