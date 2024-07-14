import styles from './PostPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import Comment from '../../../components/Commnet/Comment.jsx';
import NestedComment from '../../../components/Commnet/NestedComment.jsx';
import InputBar from '../../../components/InputBar/InputBar.jsx';
import { POST_CONTENT } from '../../../constants/postContent_dummy.js';
import timeAgo from '../../../utils/timeAge.js';

export default function PostPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.side_menu_btn}>
            <Icon id='arrow-back' />
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.profile_icon}>
            <Icon id='profile' />
          </div>
          <p className={styles.name}>{POST_CONTENT.userDisplay}</p>
          <div className={styles.more_option}>
            <Icon id='more-option' />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{POST_CONTENT.title}</h1>
        <p className={styles.text}>{POST_CONTENT.content}</p>
        <p className={styles.edited}>
          {POST_CONTENT.edited
            ? timeAgo(POST_CONTENT.updatedAt) + ' (수정됨)'
            : timeAgo(POST_CONTENT.createdAt)}
        </p>
        <div className={styles.post_bottom}>
          <div className={styles.comment_icon}>
            <Icon id='comment' />
          </div>
          <p className={styles.comment_cnt}>3</p>
          <div className={styles.like_icon}>
            <Icon id='blank-heart' />
          </div>
          <p className={styles.like_cnt}>{POST_CONTENT.likeCount}</p>
          <p className={styles.view_cnt}>{POST_CONTENT.viewCount} 조회</p>
        </div>
      </div>
      <Comment />
      <NestedComment />
      <InputBar />
    </div>
  );
}
