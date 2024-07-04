import styles from './BoardListPage.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import PostBar from '../../components/PostBar/PostBar.jsx';
import Sponser from '../../components/Sponser/Sponser.jsx';

export default function BoardListPage() {
  return (
    <div className={styles.container}>
      <div className={styles.refresh_icon}>
        <Icon id='refresh' />
      </div>
      <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.side_menu_btn}>
            <Icon id='hamburger' />
          </div>
          <h1>게시판 타이틀</h1>
        </div>
        <div className={styles.notification_bar}>
          <div className={styles.notification_icon}>
            <Icon id='notification' />
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
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
        <PostBar />
      </div>
      <div className={styles.sponser}>
        <Sponser />
      </div>
    </div>
  );
}
