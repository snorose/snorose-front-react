import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useScrollRestoration } from '@/shared/hook';
import { BackAppBar, Icon, WriteButton } from '@/shared/component';
import { QUERY_KEY } from '@/shared/constant';

import { getNoticeLine } from '@/apis';
import { PostsSuspense } from '@/pages/PostsPage';
import { getBoard } from '@/utils';

import styles from './PostsPage.module.css';

export default function PostsPage() {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);
  const { scrollRef, saveScrollPosition } = useScrollRestoration();
  const isBesookt = currentBoardTextId === 'besookt' ? true : false;

  const { data: noticeLineData } = useQuery({
    queryKey: [QUERY_KEY.noticeLine, currentBoard.id],
    queryFn: () => getNoticeLine(currentBoard?.id),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className={styles.container} ref={scrollRef}>
      <BackAppBar
        title={currentBoard.title}
        hasMenu
        {...(!isBesookt && { hasSearch: true })}
        backNavTo={'/board'}
      />
      {!isBesookt && (
        <div className={styles.top}>
          <Link
            className={styles.notificationBar}
            to={`/board/${currentBoardTextId}/notice`}
          >
            <Icon id='notice-bell' width={11} height={13} />
            <p>[필독]&nbsp;&nbsp;{noticeLineData?.title}</p>
          </Link>
        </div>
      )}
      <PostsSuspense saveScrollPosition={saveScrollPosition} />
      {!isBesookt && (
        <WriteButton
          to={`/board/${currentBoardTextId}/post-write`}
          className={styles.writeButton}
        />
      )}
    </section>
  );
}
