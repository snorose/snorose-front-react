import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeLine } from '@/apis';

import { useScrollRestoration } from '@/hooks';

import { BoardPostList } from '@/pages/BoardPage';
import { BackAppBar, Icon, WriteButton } from '@/components';

import { getBoard } from '@/utils';
import { QUERY_KEY } from '@/constants';

import styles from './BoardListPage.module.css';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);
  const { scrollRef, saveScrollPosition } = useScrollRestoration();

  const { data: noticeLineData } = useQuery({
    queryKey: [QUERY_KEY.noticeLine, currentBoard.id],
    queryFn: () => getNoticeLine(currentBoard?.id),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className={styles.container}>
      <BackAppBar
        title={currentBoard.title}
        hasMenu
        hasSearch
        backNavTo={'/board'}
      />
      <div className={styles.scrollContainer} ref={scrollRef}>
        <div className={styles.top}>
          <Link
            className={styles.notification_bar}
            to={`/board/${currentBoardTextId}/notice`}
          >
            <Icon id='notice-bell' width={11} height={13} />
            <p>[필독]&nbsp;&nbsp;{noticeLineData?.title}</p>
          </Link>
        </div>
        <BoardPostList saveScrollPosition={saveScrollPosition} />
      </div>
      <WriteButton
        to={`/board/${currentBoardTextId}/post-write`}
        className={styles.writeButton}
      />
    </div>
  );
}
