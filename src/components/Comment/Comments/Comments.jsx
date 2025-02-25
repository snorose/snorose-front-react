import { useParams } from 'react-router-dom';

import { getComments } from '@/apis';
import { useSuspensePagination } from '@/hooks';

import { FetchLoading } from '@/shared/component';
import { Comment } from '@/components';
import { filterVisibleComments, flatPaginationCache } from '@/utils';
import { QUERY_KEY } from '@/constants';

import styles from './Comments.module.css';

export default function Comments({ commentCount }) {
  const { postId } = useParams();

  const { data, isFetching, ref } = useSuspensePagination({
    queryKey: [QUERY_KEY.comments, postId],
    queryFn: ({ pageParam }) => getComments({ postId, page: pageParam }),
  });

  const commentList = flatPaginationCache(data);
  const visibledCommentList = filterVisibleComments(commentList);

  return (
    <div className={styles.comments}>
      <p className={styles.commentsTitle}>
        댓글 {commentCount.toLocaleString()}개
      </p>
      {visibledCommentList.map((comment, index) => (
        <Comment
          ref={index === visibledCommentList.length - 1 ? ref : undefined}
          key={comment.id}
          data={comment}
        />
      ))}
      {isFetching && <FetchLoading />}
    </div>
  );
}
