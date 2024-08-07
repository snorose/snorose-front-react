import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NoticeListPage.module.css';
import { BackAppBar } from '../../components/AppBar';
import { NOTICE_LIST } from '../../dummy/data/noticeList.js';
import { NoticeBar } from '../../components/NoticeBar';

export default function NoticeListPage() {
  const navigate = useNavigate();
  const handleNavClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  const titleMap = {
    'first-snow': '첫눈온방 공지',
    'large-snow': '함박눈방 공지',
    'permanent-snow': '만년설방 공지',
    besookt: '베숙트',
  };

  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[2];
  const currentBoard = titleMap[currentPath] || '';

  return (
    <div className={styles.container}>
      <BackAppBar title={currentBoard} hasNotice={true} />
      <div className={styles.content}>
        {NOTICE_LIST &&
          NOTICE_LIST.map((post) => <NoticeBar key={post.postId} data={post} onClick={handleNavClick('/post')}/>)}
      </div>
    </div>
  );
}
