import styles from './PostPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import Comment from '../../../components/Commnet/Comment.jsx';
import InputBar from '../../../components/InputBar/InputBar.jsx';
import { POST_CONTENT } from '../../../constants/postContentDummy.js';
import { COMMENT_LIST } from '../../../constants/commentDummy.js';
import timeAgo from '../../../utils/timeAgo.js';

// const data = {
//   id: 2,
//   postId: 1,
//   userProfile: 'string',
//   userDisplay: '송이1',
//   isWriter: true,
//   content: 'comment test',
//   likeCount: 1,
//   reportCount: 0,
//   createdAt: '2024-07-14T04:13:06.215Z',
//   updatedAt: '2024-07-14T04:13:06.215Z',
//   deletedAt: '2024-07-14T04:13:06.215Z',
//   isVisible: true,
//   isUpdated: true,
//   isDeleted: false,
//   parentId: 1,
//   children: ['string'],
// };

export default function PostPage() {
  return (
    <div className={styles.container}>
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
            <Icon id='comment' width='15' height='13' />
            <p>3</p>
          </div>
          <div className={styles.count}>
            <Icon id='heart' width='13' height='12' />
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
