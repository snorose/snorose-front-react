import { Link, useLocation } from 'react-router-dom';
import { getPostList } from '@/apis';
import { usePagination, useScrollRestoration } from '@/hooks';

import React from 'react';
import { PostBar, PTR, FetchLoading } from '@/components';

import { getBoard, timeAgo } from '@/utils';
import { QUERY_KEY } from '@/constants';

import styles from './BoardPostList.module.css';

export default function BoardPostList() {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);

  // 스크롤 위치 저장 및 복원
  const { scrollRef, saveScrollPosition } = useScrollRestoration();

  // 페이지네이션 관련 hook
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
      <FetchLoading animation={false}>
        게시글을 불러오지 못했습니다.
      </FetchLoading>
    );
  }

  const postList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];

  return (
    <PTR onRefresh={() => refetch().then(() => console.log('Refreshed!'))}>
      <div
        className={styles.postListContainer}
        ref={scrollRef}
        style={{ overflowY: 'auto', height: '100vh' }}
      >
        {status !== 'error' &&
          postList.map((post, index) => (
            <Link
              key={post.postId}
              to={`/board/${currentBoardTextId}/post/${post.postId}`}
              ref={index === postList.length - 1 ? ref : undefined}
              onClick={saveScrollPosition}
            >
              <PostBar data={{ ...post, timeAgo: timeAgo(post.date) }} />
            </Link>
          ))}
        {isFetching && <FetchLoading />}
      </div>
    </PTR>
  );
}
