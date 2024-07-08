import styles from './PostListPage.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import PostBar from '../../components/PostBar/PostBar.jsx';
import Sponser from '../../components/Sponser/Sponser.jsx';
import POSTLIST from '../../constants/postlist_dummy.js';
import { useLocation } from 'react-router-dom';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentBoardId = pathname.split('/')[2];

  const boardName = {
    'first-snow': '첫눈온방',
    'large-snow': '함박눈방',
    'permanent-snow': '만년설방',
    besookt: '베숙트',
  };
  const currentBoardName = boardName[currentBoardId];

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.side_menu_btn}>
            <Icon id='hamburger' />
          </div>
          <h1>{currentBoardName}</h1>
        </div>
        <div className={styles.notification_bar}>
          <div className={styles.notification_icon}>
            <Icon id='notification-red' />
          </div>
          <p>필독 공지사항</p>
        </div>
        <div className={styles.keyword_box}>
          <div className={styles.keyword}>꿀팁</div>
          <div className={styles.keyword}>일상</div>
          <div className={styles.keyword}>우리과 찾기</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.pencil_icon}>
          <Icon id='pencil' />
        </div>
        {POSTLIST.map((post, index) => (
          <PostBar key={index} data={post} />
        ))}
      </div>
      <div className={styles.refresh_icon}>
        <Icon id='refresh' />
      </div>
      <div className={styles.sponser}>
        <Sponser />
      </div>
    </div>
  );
}
