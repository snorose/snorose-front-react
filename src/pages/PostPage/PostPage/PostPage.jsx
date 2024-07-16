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
      {COMMENT_LIST &&
        COMMENT_LIST.map((comment) => (
          <Comment key={comment.id} data={comment} /> // `data` prop에 `comment` 객체를 전달
        ))}
      <InputBar />
    </div>
  );
}
