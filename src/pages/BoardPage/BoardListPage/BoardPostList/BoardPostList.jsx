import { Link, useLocation } from 'react-router-dom';

import { getPostList } from '@/apis';

import { usePagination } from '@/hooks';

import { BackAppBar, PostBar, PTR, FetchLoading } from '@/components';

import { getBoard, timeAgo } from '@/utils';
import { QUERY_KEY } from '@/constants';

import styles from './BoardPostList.module.css';

export default function BoardPostList() {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);

  const { data, ref, isLoading, isFetching, status, isError, refetch } =
    usePagination({
      queryKey: [QUERY_KEY.posts, currentBoard.id],
      queryFn: ({ pageParam }) => getPostList(currentBoard.id, pageParam),
    });

  if (isLoading) {
    return <FetchLoading>게시글 불러오는 중...</FetchLoading>;
  }

  if (isError) {
    return (
      <>
        <BackAppBar notFixed />
        <FetchLoading animation={false}>
          게시글을 불러오지 못했습니다.
        </FetchLoading>
      </>
    );
  }

  const postList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];

  return (
    <PTR onRefresh={() => refetch().then(() => console.log('Refreshed!'))}>
      <div className={styles.postListContainer}>
        {status !== 'error' &&
          postList.map((post, index) => (
            <Link
              ref={index === postList.length - 1 ? ref : undefined}
              key={post.postId}
              to={`/board/${currentBoardTextId}/post/${post.postId}`}
            >
              <PostBar data={{ ...post, timeAgo: timeAgo(post.date) }} />
            </Link>
          ))}
        {isFetching && <FetchLoading />}
      </div>
    </PTR>
  );
}