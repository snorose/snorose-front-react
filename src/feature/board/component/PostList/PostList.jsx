import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSuspensePagination } from '@/shared/hook';
import { FetchLoading, List, PullToRefresh } from '@/shared/component';
import {
  timeAgo,
  getBoard,
  getBoardTitleToTextId,
  deduplicatePaginatedData,
  flatPaginationCache,
} from '@/shared/lib';
import { QUERY_KEY, STALE_TIME } from '@/shared/constant';

import { getPosts } from '@/apis';
import { PostBar } from '@/feature/board/component';

import styles from './PostList.module.css';
import ProgressTab from '@/feature/event/component/ProgressTab/ProgressTab';

import { PROGRESS } from '@/feature/event/constant';

export default function PostList({ saveScrollPosition }) {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);
  const isBesookt = currentBoardTextId === 'besookt' ? true : false;
  const isEvent = currentBoardTextId === 'event';
  const [activeTab, setActiveTab] = useState('ALL');

  // 페이지네이션 관련 hook
  const { data, ref, isFetching, refetch } = useSuspensePagination({
    queryKey: [QUERY_KEY.posts, currentBoard.id],
    queryFn: ({ pageParam }) => getPosts(currentBoard.id, pageParam),
    staleTime: STALE_TIME.boardPostList,
  });

  const postList = deduplicatePaginatedData(flatPaginationCache(data));

  const filteredPosts = isEvent
    ? activeTab === 'ALL'
      ? postList
      : postList.filter((post) => post.progressType === activeTab)
    : postList;

  const isProgressEmpty = filteredPosts.length === 0;

  if (postList.length === 0) {
    return <FetchLoading animation={false}>게시물이 없어요</FetchLoading>;
  }

  return (
    <div>
      {isEvent && (
        <div className={styles.progressTab}>
          {Object.entries(PROGRESS).map(([key, value]) => (
            <ProgressTab
              key={key}
              progress={value}
              isSelected={key === activeTab}
              onClick={() => setActiveTab(key)}
            >
              {value}
            </ProgressTab>
          ))}
        </div>
      )}

      <PullToRefresh
        onRefresh={() => refetch().then(() => console.log('Refreshed!'))}
      >
        <List>
          {filteredPosts.map((post, index) => (
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
          {isEvent && isProgressEmpty && (
            <FetchLoading animation={false}>해당 이벤트가 없어요</FetchLoading>
          )}
        </List>
      </PullToRefresh>
    </div>
  );
}
