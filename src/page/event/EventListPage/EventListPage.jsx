import { useQuery } from '@tanstack/react-query';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { getNoticeLine } from '@/apis';

import { BackAppBar, Icon, WriteButton } from '@/shared/component';
import { QUERY_KEY, ROLE } from '@/shared/constant';
import { useAuth, useScrollRestoration } from '@/shared/hook';
import { getBoard } from '@/shared/lib';

import ProgressTab from '@/feature/event/component/ProgressTab/ProgressTab';
import { PROGRESS } from '@/feature/event/constant';
import { PostListSuspense } from '@/feature/board/component';

import styles from './EventListPage.module.css';

export default function EventListPage() {
  const { pathname } = useLocation();
  const { userInfo } = useAuth();
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard = getBoard(currentBoardTextId);
  const { scrollRef, saveScrollPosition } = useScrollRestoration();
  const isAdmin = userInfo?.userRoleId === ROLE.admin;

  const [searchParams, setSearchParams] = useSearchParams();
  const activeProgress = searchParams.get('progress') ?? 'ALL';

  const { data: noticeLineData } = useQuery({
    queryKey: [QUERY_KEY.noticeLine, currentBoard.id],
    queryFn: () => getNoticeLine(currentBoard?.id),
    staleTime: 1000 * 60 * 5,
  });

  const updateProgress = (progress) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (progress === 'ALL') {
        newParams.delete('progress');
      } else {
        newParams.set('progress', progress);
      }

      return newParams;
    });
  };

  return (
    <section className={styles.container} ref={scrollRef}>
      <BackAppBar title='이벤트' hasMenu />
      <div className={styles.notification}>
        <Link className={styles.notificationBar} to={`/board/event/notice`}>
          <Icon id='notice-bell' width={11} height={13} />
          <p>[필독]&nbsp;&nbsp;{noticeLineData?.title}</p>
        </Link>
      </div>

      <div className={styles.progressTab}>
        {Object.entries(PROGRESS).map(([key, value]) => (
          <ProgressTab
            key={key}
            progress={value}
            isSelected={key === activeProgress}
            onClick={() => updateProgress(key)}
          >
            {value}
          </ProgressTab>
        ))}
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
