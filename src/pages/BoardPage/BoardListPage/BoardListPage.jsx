import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeLine, getPostList } from '@/apis';

import { usePagination } from '@/hooks';

import {
  BackAppBar,
  Icon,
  OptionModal,
  PostBar,
  PTR,
  WriteButton,
  FetchLoading,
} from '@/components';

import { getBoard, timeAgo } from '@/utils';

import styles from './BoardListPage.module.css';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);

  const { data, ref, isLoading, status, isError, refetch } = usePagination({
    queryKey: ['postList', currentBoard.id],
    queryFn: ({ pageParam }) => getPostList(currentBoard.id, pageParam),
  });

  const { data: noticeLineData } = useQuery({
    queryKey: ['noticeLine', currentBoard.id],
    queryFn: () => getNoticeLine(currentBoard?.id),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  if (isLoading) {
    return (
      <>
        <BackAppBar />
        <FetchLoading>게시글 불러오는 중...</FetchLoading>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <BackAppBar />
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
    <div className={styles.container}>
      <BackAppBar
        title={currentBoard.title}
        hasMenu
        hasSearch
        backNavTo={'/board'}
      />
      <div className={styles.top}>
        <Link
          className={styles.notification_bar}
          to={`/board/${currentBoardTextId}/notice`}
        >
          <Icon id='notice-bell' width={11} height={13} />
          <p>[필독]&nbsp;&nbsp;{noticeLineData?.title}</p>
        </Link>
      </div>
      <PTR onRefresh={() => refetch().then(() => console.log('Refreshed!'))}>
        <div className={styles.postListContainer}>
          {status !== 'error' &&
            postList.map((post, index) => (
              <Link
                ref={index === postList.length - 1 ? ref : undefined}
                key={post.postId}
                to={`/board/${currentBoardTextId}/post/${post.postId}`}
              >
                <PostBar
                  data={{ ...post, timeAgo: timeAgo(post.date) }}
                  optionClick={openModal}
                />
              </Link>
            ))}
        </div>
      </PTR>
      <OptionModal
        id='post-report'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <WriteButton
        to={`/board/${currentBoardTextId}/post-write`}
        className={styles.writeButton}
      />
    </div>
  );
}
