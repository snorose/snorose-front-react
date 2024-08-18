import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import {
  deleteComment as remove,
  getCommentList,
  postComment as post,
  editComment as edit,
} from '../apis/comment.js';

export default function useComment() {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const { data: commentList } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentList(postId),
    staleTime: 1000 * 60,
    onError: (error) => {
      console.error('댓글을 불러올 수 없습니다.', error);
    },
  });

  const postComment = useMutation({
    mutationFn: ({ content, parentId }) => post({ postId, parentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: (error) => {
      const ERROR_STATUS = error.response.status;

      if (ERROR_STATUS === 400) {
        alert('댓글 등록에 실패했습니다.');
      } else if (ERROR_STATUS === 404) {
        alert('찾을 수 없는 댓글입니다.');
      }
    },
  });

  const deleteComment = useMutation({
    mutationFn: ({ commentId }) => remove({ postId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: (error) => {
      const ERROR_STATUS = error.response.status;
      const ERROR_CODE = error.response.data.code;

      if (ERROR_STATUS === 400) {
        alert('댓글 삭제에 실패했습니다.');
      } else if (ERROR_CODE === 404 && ERROR_CODE === 3031) {
        alert('사라진 게시글입니다.');
      } else if (ERROR_CODE === 404 && ERROR_CODE === 3020) {
        alert('사라진 댓글입니다.');
      }
    },
  });

  const editComment = useMutation({
    mutationFn: ({ commentId, content, parentId }) =>
      edit({ postId, commentId, content, parentId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: (error) => {
      const ERROR_STATUS = error.response.status;
      const ERROR_CODE = error.response.data.code;

      if (ERROR_STATUS === 400) {
        alert('댓글 수정에 실패했습니다.');
      } else if (ERROR_CODE === 404 && ERROR_CODE === 3031) {
        alert('사라진 게시글입니다.');
      } else if (ERROR_CODE === 404 && ERROR_CODE === 3020) {
        alert('사라진 댓글입니다.');
      }
    },
  });

  return { commentList, postComment, deleteComment, editComment };
}
