import { Link } from 'react-router-dom';

import { getMyPostList } from '@/apis';

import { usePagination } from '@/hooks';

import { BackAppBar, FetchLoading, PostBar } from '@/components';

import { getBoardTextId } from '@/utils';

import { QUERY_KEY } from '@/constants';
import frustratedWomanIllustration from '@/assets/images/frustratedWoman.svg';

import styles from './ActivityPage.module.css';

export default function MyPostPage() {
  const { data, ref, isLoading, isFetching, isError, error } = usePagination({
    queryKey: [QUERY_KEY.myPosts],
    queryFn: ({ pageParam }) => getMyPostList({ page: pageParam }),
  });

  if (isLoading) {
    return <FetchLoading>불러오는 중</FetchLoading>;
  }

  if (isError) {
    const { message } = error.response.data;

    return <FetchLoading animation={false}>{message}</FetchLoading>;
  }

  const myPostList =
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
          <h1 className={styles.title}>내가 쓴 글</h1>
        </div>

        <article className={styles.contentListContainer}>
          {myPostList.length > 0 ? (
            myPostList.map((post, index) => (
              <Link
                ref={index === myPostList.length - 1 ? ref : undefined}
                key={post.postId}
                to={`/board/${getBoardTextId(post.boardId)}/post/${post.postId}`}
                state={{ from: '/my-page/my-post' }}
              >
                <PostBar data={post} />
              </Link>
            ))
          ) : (
            <div className={styles.noContentWrapper}>
              <p className={styles.noContentMessage}>아직 작성한 글이 없어요</p>
              <div className={styles.imageWrapper}>
                <img
                  className={styles.image}
                  src={frustratedWomanIllustration}
                  alt='frustrated woman'
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
