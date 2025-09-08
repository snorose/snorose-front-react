import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';

import { getNoticeLine } from '@/apis';

import { BackAppBar, Icon, WriteButton } from '@/shared/component';
import { QUERY_KEY, ROLE } from '@/shared/constant';
import { useAuth, useScrollRestoration } from '@/shared/hook';
import { getBoard } from '@/shared/lib';

import { PostListSuspense } from '@/feature/board/component';

import styles from './EventListPage.module.css';

export default function PostListPage() {
  const { pathname } = useLocation();
  const { userInfo } = useAuth();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);
  const { scrollRef, saveScrollPosition } = useScrollRestoration();
  const isAdmin = userInfo?.userRoleId === ROLE.admin;

  const { data: noticeLineData } = useQuery({
    queryKey: [QUERY_KEY.noticeLine, currentBoard.id],
    queryFn: () => getNoticeLine(currentBoard?.id),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className={styles.container} ref={scrollRef}>
      <BackAppBar title='이벤트' hasMenu />
      <div className={styles.notification}>
        <Link className={styles.notificationBar} to={`/board/event/notice`}>
          <Icon id='notice-bell' width={11} height={13} />
          <p>[필독]&nbsp;&nbsp;{noticeLineData?.title}</p>
        </Link>
      </div>

      <PostListSuspense saveScrollPosition={saveScrollPosition} />
      {isAdmin && (
        <WriteButton
          to={`/board/event/event-post-write`}
          className={styles.writeButton}
        />
      )}
    </section>
  );
}
