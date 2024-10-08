import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeLine } from '@/apis';

import { BackAppBar, Icon, WriteButton } from '@/components';

import { getBoard } from '@/utils';
import { QUERY_KEY } from '@/constants';

import styles from './BoardListPage.module.css';
import BoardPostList from './BoardPostList/BoardPostList.jsx';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);

  const { data: noticeLineData } = useQuery({
    queryKey: [QUERY_KEY.noticeLine, currentBoard.id],
    queryFn: () => getNoticeLine(currentBoard?.id),
  });

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
      <BoardPostList />
      <WriteButton
        to={`/board/${currentBoardTextId}/post-write`}
        className={styles.writeButton}
      />
    </div>
  );
}
