import styles from './Comment.module.css';
import Icon from '../../components/Icon/Icon.jsx';

export default function NestedComment() {
  return (
    <div className={styles.nested_comment}>
      <div className={styles.comment}>
        <div className={styles.comment_top}>
          <div className={styles.comment_left}>
            <div className={styles.profile_icon}>
              <Icon id='profile' />
            </div>
            <p className={styles.name}>이름</p>
          </div>
          <div className={styles.comment_right}>
            <p className={styles.cnt_num}>3</p>
            <div className={styles.like_icon}>
              <Icon id='blank-heart' />
            </div>
            <p className={styles.cnt_num}>5</p>
            <div className={styles.more_option}>
              <Icon id='more-option' />
            </div>
          </div>
        </div>
        <p className={styles.comment_text}>맛있겠다...</p>
        <p className={styles.comment_time}>1시간 전 ...</p>
      </div>
    </div>
  );
}
