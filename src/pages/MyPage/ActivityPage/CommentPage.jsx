import { Link } from 'react-router-dom';

import { getMyCommentList } from '@/apis';

import { usePagination } from '@/hooks';

import { BackAppBar, FetchLoading, PostBar } from '@/components';

import { getBoardTextId } from '@/utils';
import { QUERY_KEY } from '@/constants';

import frustratedWomanIllustration from '@/assets/images/frustratedWoman.svg';

import styles from './ActivityPage.module.css';

export default function CommentPage() {
  const { data, ref, isLoading, isError } = usePagination({
    queryKey: [QUERY_KEY.myCommentedPosts],
    queryFn: ({ pageParam }) => getMyCommentList({ page: pageParam }),
  });

  if (isLoading) {
    return <FetchLoading>불러오는 중</FetchLoading>;
  }

  if (isError) {
    return (
      <FetchLoading animation={false}>잠시 후 다시 시도해 주세요</FetchLoading>
    );
  }

  const myCommentList =
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
          <h1 className={styles.title}>댓글 단 글</h1>
        </div>

        <article className={styles.contentListContainer}>
          {myCommentList.length > 0 ? (
            myCommentList.map((post, index) => (
              <Link
                ref={index === myCommentList.length - 1 ? ref : undefined}
                key={post.postId}
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
    </main>
  );
}
