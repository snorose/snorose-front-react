import { Icon } from '../../../components/Icon';
import { Comment } from '../../../components/Comment';
import { InputBar } from '../../../components/InputBar';
import { BackAppBar } from '../../../components/AppBar';
import { POST_CONTENT } from '../../../dummy/data/postContent.js';
import { COMMENT_LIST } from '../../../dummy/data/comment.js';
import styles from './PostPage.module.css';
import timeAgo from '../../../utils/timeAgo.js';

export default function PostPage() {
  return (
    <div className={styles.container}>
      <div className={styles.backAppBar}>
        <BackAppBar />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.contentTopLeft}>
            <Icon id='cloud' width='25' height='16' />
            <p>{POST_CONTENT.userDisplay}</p>
            <p className={styles.dot}>·</p>
            <p>
              {POST_CONTENT.edited
                ? timeAgo(POST_CONTENT.updatedAt) + ' (수정됨)'
                : timeAgo(POST_CONTENT.createdAt)}
            </p>
          </div>
          <Icon id='ellipsis-vertical' width='3' height='11' />
        </div>
        <div className={styles.title}>
          <p>{POST_CONTENT.title}</p>
          <p>{POST_CONTENT.viewCount} views</p>
        </div>
        <p className={styles.text}>{POST_CONTENT.content}</p>
        <div className={styles.post_bottom}>
          <div className={styles.count}>
            <Icon
              id='comment'
              width='15'
              height='13'
              fill={POST_CONTENT.liked ? '#5F86BF' : '#D9D9D9'}
            />
            <p>3</p>
          </div>
          <div className={styles.count}>
            <Icon id='like' width='13' height='12' fill='#D9D9D9' />
            <p>{POST_CONTENT.likeCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.comments}>
        <p className={styles.commentsTitle}>댓글 2개</p>
        {COMMENT_LIST &&
          COMMENT_LIST.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
      </div>
      <InputBar />
    </div>
  );
}
