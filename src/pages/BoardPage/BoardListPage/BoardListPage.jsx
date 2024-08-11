import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import styles from './BoardListPage.module.css';

import Icon from '../../../components/Icon/Icon.jsx';
import { BackAppBar } from '../../../components/AppBar';
import { PostBar } from '../../../components/PostBar';
import { Sponser } from '../../../components/Sponser';
import { OptionModal } from '../../../components/Modal';
import PTR from '../../../components/PTR/PTR.jsx';
import useIntersect from '../../../hooks/useIntersect.jsx';
import { getPostList } from '../../../apis/postList.js';
import { Target } from '../../../components/Target/index.js';
import { BOARD_MENUS } from '../../../constants/boardMenus.js';

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
              <PostBar key={post.postId} data={post} optionClick={openModal} />
            ))}
        </div>
      </PTR>
      <div className={styles.pencil_icon}>
        <Icon
          id='pencil-circle'
          width={105}
          height={105}
          onClick={handleNavClick('/post-write')}
        />
      </div>
      <div className={styles.sponser}>
        <Sponser />
      </div>
      <OptionModal
        id='post-report'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <Target ref={ref} height='100px' />
    </div>
  );
}
