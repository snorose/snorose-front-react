import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BoardListPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import BackAppBar from '../../../components/AppBar/BackAppBar/BackAppBar.jsx';
import PostBar from '../../../components/PostBar/PostBar.jsx';
import Sponser from '../../../components/Sponser/Sponser.jsx';
import { POST_LIST } from '../../../dummy/data/postList.js';
import PTR from '../../../components/PTR/PTR.jsx';

export default function BoardListPage() {
  const navigate = useNavigate();
  const handleNavClick = (to) => {
    return () => {
      navigate(to);
    };
  };

  const boardMap = {
    'first-snow': '첫눈온방',
    'large-snow': '함박눈방',
    'permanent-snow': '만년설방',
    besookt: '베숙트',
  };

  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[2];
  const currentBoard = boardMap[currentPath] || '';

  return (
    <div className={styles.container}>
      <BackAppBar title={currentBoard} hasMenu hasSearch />
      <div className={styles.top}>
        <div
          className={styles.notification_bar}
          onClick={handleNavClick('./notice')}
        >
          <Icon id='notice-bell' width={11} height={13} />
          <p>[필독] 공지사항</p>
        </div>
      </div>
      <PTR>
        <div className={styles.content}>
          {POST_LIST &&
            POST_LIST.map((post) => <PostBar key={post.postId} data={post} />)}
        </div>
      </PTR>
      <div className={styles.pencil_icon}>
        <Icon
          id='pencil-circle'
          width={105}
          height={105}
          onClick={handleNavClick('/post-write')}
        />
      </div>
      <div className={styles.sponser}>
        <Sponser />
      </div>
    </div>
  );
}
