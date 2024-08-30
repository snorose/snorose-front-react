import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeLine, getPostList } from '@/apis';

import { TOAST } from '@/constants';
import { USER } from '@/dummy/data';

import { useInfiniteScroll, useToast } from '@/hooks';

import {
  BackAppBar,
  Icon,
  OptionModal,
  PostBar,
  Sponsor,
  PTR,
  Target,
  WriteButton,
  FetchLoading,
} from '@/components';

import { timeAgo } from '@/utils';

import { BOARD_MENUS, BOARD_POST_WRITE } from '@/constants';

import styles from './BoardListPage.module.css';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const { toast } = useToast();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === currentBoardTextId) || {};
  const boardPostWriteAuth = BOARD_POST_WRITE[currentBoard.id] || [];

  const { data, ref, isLoading, status, isError, refetch } = useInfiniteScroll({
    queryKey: ['postList', currentBoard.id],
    queryFn: ({ pageParam }) => getPostList(currentBoard.id, pageParam),
  });

  // 1줄 공지 데이터 받아오기
  const [noticeTitle, setNoticeTitle] = useState('');
  const { data: noticeLineData } = useQuery({
    queryKey: ['noticeLine', currentBoard.id],
    queryFn: () => getNoticeLine(currentBoard?.id),
    enabled: !!currentBoard?.id,
  });

  // 데이터 화면 표시
  useEffect(() => {
    if (noticeLineData) {
      setNoticeTitle(noticeLineData.title);
    }
  }, [noticeLineData]);

  const postList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const navigate = useNavigate();
  const handleNavClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  // 게시글 작성 권한 확인
  const handleWriteButtonClick = () => {
    console.log('현재 유저 role: ', USER?.role);
    if (boardPostWriteAuth.includes(USER?.role)) {
      navigate(`/board/${currentBoardTextId}/post-write`);
    } else {
      toast(TOAST.NO_AUTH_POST_WRITE); // 권한이 없을 때의 토스트 메시지
    }
  };

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

  return (
    <div className={styles.container}>
      <BackAppBar title={currentBoard.title} hasMenu hasSearch />
      <div className={styles.top}>
        <div
          className={styles.notification_bar}
          onClick={handleNavClick('./notice')}
        >
          <Icon id='notice-bell' width={11} height={13} />
          <p>[필독]&nbsp;&nbsp;{noticeTitle}</p>
        </div>
      </div>
      <PTR onRefresh={() => refetch().then(() => console.log('Refreshed!'))}>
        <div className={styles.postListContainer}>
          {status !== 'error' &&
            postList.map((post) => (
              <PostBar
                key={post.postId}
                data={{ ...post, timeAgo: timeAgo(post.date) }}
                optionClick={openModal}
                use='post'
              />
            ))}
        </div>
      </PTR>
      <div className={styles.sponsor}>
        <Sponsor />
      </div>
      <OptionModal
        id='post-report'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <Target ref={ref} height='100px' />
      <WriteButton
        onClick={handleWriteButtonClick}
        className={styles.writeButton}
      />
    </div>
  );
}
