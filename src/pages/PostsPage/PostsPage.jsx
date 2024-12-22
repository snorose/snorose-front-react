import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeLine } from '@/apis';
import { useScrollRestoration } from '@/hooks';
import { BackAppBar, Icon, WriteButton } from '@/components';
import { Posts } from '@/pages/PostsPage';
import { getBoard } from '@/utils';
import { QUERY_KEY } from '@/constants';

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
    <div className={styles.container} ref={scrollRef}>
      <BackAppBar
        title={currentBoard.title}
        hasMenu
        {...(!isBesookt && { hasSearch: true })}
        backNavTo={'/board'}
      />
      {!isBesookt && (
        <div className={styles.top}>
          <Link
            className={styles.notification_bar}
            to={`/board/${currentBoardTextId}/notice`}
          >
            <Icon id='notice-bell' width={11} height={13} />
            <p>[필독]&nbsp;&nbsp;{noticeLineData?.title}</p>
          </Link>
        </div>
      )}
      <Posts saveScrollPosition={saveScrollPosition} />
      {!isBesookt && (
        <WriteButton
          to={`/board/${currentBoardTextId}/post-write`}
          className={styles.writeButton}
        />
      )}
    </div>
  );
}
