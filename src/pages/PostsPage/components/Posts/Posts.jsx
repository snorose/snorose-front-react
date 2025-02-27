import { Link, useLocation } from 'react-router-dom';

import { useSuspensePagination } from '@/shared/hook';
import { FetchLoading, List, PullToRefresh } from '@/shared/component';
import { timeAgo, getBoard, getBoardTitleToTextId } from '@/shared/lib';
import { QUERY_KEY, STALE_TIME } from '@/shared/constant';

import { getPosts } from '@/apis';
import { PostBar } from '@/components';
import { deduplicatePaginatedData, flatPaginationCache } from '@/utils';

import styles from './Posts.module.css';

export default function Posts({ saveScrollPosition }) {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);
  const isBesookt = currentBoardTextId === 'besookt' ? true : false;

  // 페이지네이션 관련 hook
  const { data, ref, isFetching, refetch } = useSuspensePagination({
    queryKey: [QUERY_KEY.posts, currentBoard.id],
    queryFn: ({ pageParam }) => getPosts(currentBoard.id, pageParam),
    staleTime: STALE_TIME.boardPostList,
  });

  const postList = deduplicatePaginatedData(flatPaginationCache(data));

  return (
    <PullToRefresh
      onRefresh={() => refetch().then(() => console.log('Refreshed!'))}
    >
      <List>
        {postList.map((post, index) => (
          <Link
            className={styles.to}
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
      </List>
    </PullToRefresh>
  );
}
