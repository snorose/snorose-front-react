import { useParams } from 'react-router-dom';

import { getCommentList } from '@/apis';

import { usePagination } from '@/hooks';

import { Comment } from '@/components/Comment';
import { FetchLoading } from '@/components/Loading';

import { filterVisibleComments, flatPaginationCache } from '@/utils';
import { QUERY_KEY } from '@/constants';

import styles from './CommentList.module.css';

export default function CommentList({ commentCount }) {
  const { postId } = useParams();

  const { data, isLoading, isFetching, isError, ref } = usePagination({
    queryKey: [QUERY_KEY.comments, postId],
    queryFn: ({ pageParam }) => getCommentList({ postId, page: pageParam }),
  });

  if (isLoading) {
    return <FetchLoading>댓글을 불러오는 중...</FetchLoading>;
  }

  if (isError) {
    return (
      <FetchLoading animation={false}>댓글을 불러올 수 없습니다.</FetchLoading>
    );
  }

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
