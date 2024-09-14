import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeList } from '@/apis/notice';

import { BackAppBar, NoticeBar, FetchLoading } from '@/components';

import { BOARD_MENUS, QUERY_KEY } from '@/constants';

import styles from './NoticeListPage.module.css';

export default function NoticeListPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [noticeList, setNoticeList] = useState([]);
  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === currentBoardTextId) || {};

  // 게시글 데이터 받아오기
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.notices, currentBoard?.id],
    queryFn: () => getNoticeList(currentBoard?.id),
    enabled: !!currentBoard?.id,
  });

  // 데이터 화면 표시
  useEffect(() => {
    if (data) {
      setNoticeList(data);
    }
  }, [data]);

  const handleNavClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  if (isLoading) {
    return (
      <>
        <BackAppBar />
        <FetchLoading>공지글 불러오는 중...</FetchLoading>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <BackAppBar />;
        <FetchLoading animation={false}>
          게시글을 불러오지 못했습니다.
        </FetchLoading>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <BackAppBar title={`${currentBoard.title} 공지`} hasNotice={true} />
      <div className={styles.content}>
        {Array.isArray(noticeList) &&
          noticeList.map((post) => (
            <NoticeBar
              key={post.postId}
              data={post}
              onClick={handleNavClick(
                `/board/${currentBoardTextId}/post/${post.postId}`
              )}
            />
          ))}
      </div>
    </div>
  );
}
