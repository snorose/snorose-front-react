import { Link, useLocation } from 'react-router-dom';

import { getPostList } from '@/apis';

import { usePagination } from '@/hooks';

import { PostBar, PTR, FetchLoading } from '@/components';

import {
  deduplicatePaginatedData,
  flatPaginationCache,
  getBoard,
  getBoardTitleToTextId,
  timeAgo,
} from '@/utils';

import { QUERY_KEY, STALE_TIME } from '@/constants';

import styles from './BoardPostList.module.css';

export default function BoardPostList({ saveScrollPosition }) {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);
  const isBesookt = currentBoardTextId === 'besookt' ? true : false;

  // 페이지네이션 관련 hook
  const { data, ref, isLoading, isFetching, status, isError, refetch } =
    usePagination({
      queryKey: [QUERY_KEY.posts, currentBoard.id],
      queryFn: ({ pageParam }) => getPostList(currentBoard.id, pageParam),
      staleTime: STALE_TIME.boardPostList,
    });

  if (isLoading) {
    return <FetchLoading>게시글 불러오는 중...</FetchLoading>;
  }

  if (isError) {
    return (
      <FetchLoading animation={false}>
        게시글을 불러오지 못했습니다.
      </FetchLoading>
    );
  }

  const postList = deduplicatePaginatedData(flatPaginationCache(data));

  return (
    <PTR onRefresh={() => refetch().then(() => console.log('Refreshed!'))}>
      <div className={styles.postListContainer}>
        {status !== 'error' &&
          postList.map((post, index) => (
            <Link
              key={post.postId}
              to={
                isBesookt
                  ? `/board/${getBoardTitleToTextId(post.boardName)}/post/${post.postId}`
                  : `/board/${currentBoardTextId}/post/${post.postId}`
              }
              ref={index === postList.length - 1 ? ref : undefined}
              onClick={() => saveScrollPosition()}
            >
              <PostBar data={{ ...post, timeAgo: timeAgo(post.date) }} />
            </Link>
          ))}
        {isFetching && <FetchLoading />}
      </div>
    </PTR>
  );
}
