import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeLine } from '@/apis';

import { useAuth, useScrollRestoration } from '@/shared/hook';
import { BackAppBar, Icon, WriteButton } from '@/shared/component';
import { getBoard } from '@/shared/lib';
import { QUERY_KEY, ROLE, OFFICIAL_BOARD } from '@/shared/constant';

import { PostListSuspense } from '@/feature/board/component';

import styles from './PostListPage.module.css';

export default function PostListPage() {
  const { pathname } = useLocation();
  const { userInfo } = useAuth();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);
  const { scrollRef, saveScrollPosition } = useScrollRestoration();
  const isBesookt = currentBoardTextId === 'besookt' ? true : false;
  const isFirstSnow = currentBoardTextId === 'first-snow' ? true : false;
  const isPreUser = userInfo?.userRoleId === ROLE.preUser;
  const isUser = userInfo?.userRoleId === ROLE.user;
  const isAdmin = userInfo?.userRoleId === ROLE.admin;
  const isOfficial = userInfo?.userRoleId === ROLE.official;

  const isOfficialBoard = OFFICIAL_BOARD.includes(currentBoardTextId);

  const showWriteButton =
    !isBesookt &&
    (isAdmin ||
      (isOfficial && (isOfficialBoard || isFirstSnow)) ||
      (isUser && !isOfficialBoard) ||
      (isPreUser && isFirstSnow));

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
      />
      {!isBesookt && (
        <div className={styles.top}>
          <Link
            className={styles.notificationBar}
            to={`/board/${currentBoardTextId}/notice`}
          >
            <Icon id='notice-bell' width={13} height={16} />
            <p>[필독]&nbsp;&nbsp;{noticeLineData?.title}</p>
          </Link>
        </div>
      )}
      <PostListSuspense saveScrollPosition={saveScrollPosition} />
      {showWriteButton && (
        <WriteButton
          to={`/board/${currentBoardTextId}/post-write`}
          className={styles.writeButton}
        />
      )}
    </section>
  );
}
