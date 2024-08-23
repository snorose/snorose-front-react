import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NoticeListPage.module.css';
import { BackAppBar } from '../../components/AppBar';
import { NoticeBar } from '../../components/NoticeBar';
import { getNoticeList } from '../../apis/notice.js';
import { BOARD_MENUS } from '../../constants';

export default function NoticeListPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [noticeList, setNoticeList] = useState([]);

  const currentBoardTextId = pathname.split('/')[2];
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === currentBoardTextId) || {};

  useEffect(() => {
    const fetchNoticeList = async () => {
      try {
        const data = await getNoticeList(currentBoard.id);
        setNoticeList(data || []);
      } catch (error) {
        console.error('Failed to fetch notice list', error);
        setNoticeList([]);
      }
    };

    fetchNoticeList();
  }, [currentBoard.id]);

  const handleNavClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  return (
    <div className={styles.container}>
      <BackAppBar title={currentBoard.textId} hasNotice={true} />
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
