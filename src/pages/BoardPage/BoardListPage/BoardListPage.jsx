import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostList } from '@/apis/postList.js';

import { useIntersect } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { Icon } from '@/components/Icon';
import { OptionModal } from '@/components/Modal';
import { PostBar } from '@/components/PostBar';
import { Sponser } from '@/components/Sponser';
import { Target } from '@/components/Target/index.js';
import { WriteButton } from '@/components/WriteButton';
import PTR from '@/components/PTR/PTR.jsx';

import { BOARD_MENUS } from '@/constants';

import styles from './BoardListPage.module.css';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === currentBoardTextId) || {};

  const { data, hasNextPage, isFetching, status, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['postList', currentBoard.id],
      queryFn: ({ pageParam }) => getPostList(currentBoard.id, pageParam),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPage.length > 0 ? (lastPageParam || 0) + 1 : undefined;
      },
    });

  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { threshold: 0.8 }
  );

  const postList = data ? data.pages.flatMap((page) => page) : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const navigate = useNavigate();
  const handleNavClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  const handleRefresh = () => {
    return refetch().then(() => {
      console.log('Refreshed!');
    });
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
          <p>[필독] 공지사항</p>
        </div>
      </div>
      <PTR onRefresh={handleRefresh}>
        <div className={styles.postListContainer}>
          {status !== 'error' &&
            postList.map((post) => (
              <PostBar
                key={post.postId}
                data={post}
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
      <WriteButton to='/board/exam-review-write' />
    </div>
  );
}
