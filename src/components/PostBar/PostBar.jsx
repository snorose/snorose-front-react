import styles from './PostBar.module.css';
import Icon from '../../components/Icon/Icon.jsx';

export default function PostBar() {
  return (
    <div className={styles.post}>
      <div className={styles.post_top}>
        <div className={styles.profile}>
          <Icon id='profile' />
        </div>
        <p className={styles.name}>이름</p>
        <p className={styles.time}>n초 전</p>
        <div className={styles.more_option}>
          <Icon id='more-option' />
        </div>
      </div>
      <div className={styles.post_center}>
        <p className={styles.title}>제목</p>
        <p className={styles.text}>
          게시글 내용 어쩌구 저쩌구 게시글 내용 어쩌구 저쩌구 게시글 내용 어쩌구
          저쩌구 게시글 내용 어쩌구 게시글 내용 어쩌구 저쩌구 게시글 내용 어쩌구
          저쩌구 게시글 내용 어쩌구 저쩌구 게시글 내용 어쩌구 저쩌구 게시글 내용
          어쩌구 저쩌구
        </p>
      </div>
      <div className={styles.post_bottom}>
        <div className={styles.comment_icon}>
          <Icon id='comment' />
        </div>
        <p className={styles.comment_cnt}>2</p>
        <div className={styles.like_icon}>
          <Icon id='blank-heart' />
        </div>
        <p className={styles.like_cnt}>5</p>
      </div>
    </div>
  );
}
