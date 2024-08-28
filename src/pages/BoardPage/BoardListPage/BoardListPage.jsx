import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeLine, getPostList } from '@/apis';

import { useInfiniteScroll } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { Icon } from '@/components/Icon';
import { OptionModal } from '@/components/Modal';
import { PostBar } from '@/components/PostBar';
import { Sponser } from '@/components/Sponser';
import { Target } from '@/components/Target/index.js';
import { WriteButton } from '@/components/WriteButton';
import PTR from '@/components/PTR/PTR.jsx';

import timeAgo from '@/utils/timeAgo';

import { BOARD_MENUS } from '@/constants';

import styles from './BoardListPage.module.css';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === currentBoardTextId) || {};

  const { data, ref, status, refetch } = useInfiniteScroll({
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
      <div className={styles.sponser}>
        <Sponser />
      </div>
      <OptionModal
        id='post-report'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <Target ref={ref} height='100px' />
      <WriteButton to='/post-write' />
    </div>
  );
}
