import styles from './BoardListPage.module.css';
import Icon from '../../components/Icon/Icon.jsx';
import sponser from '../../assets/sponser.svg';

export default function BoardListPage() {
  return (
    <div className={styles.container}>
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
      <div className={styles.sponser}>
        <img src={sponser} alt='sponser' />
      </div>
      <div></div>
    </div>
  );
}
