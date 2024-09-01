import { filterVisibleComments } from '@/utils/filterComment.js';

import { Comment } from '../index.js';
import { FetchLoading } from '../../Loading';

import useComment from '../../../hooks/useComment.jsx';

import styles from './CommentList.module.css';

export default function CommentList({ commentCount }) {
  const { commentList } = useComment();
  const filteredCommentList = filterVisibleComments(commentList);

  if (!commentList) {
    return <FetchLoading>댓글을 불러오는 중...</FetchLoading>;
  }

  return (
    <div className={styles.comments}>
      <p className={styles.commentsTitle}>
        댓글 {commentCount.toLocaleString()}개
      </p>
      {commentList ? (
        filteredCommentList.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))
      ) : (
        <div className={styles.failComment}>댓글을 불러올 수 없습니다.</div>
      )}
    </div>
  );
}
