import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { useToast } from '@/hooks';
import { TOAST } from '@/constants';

import {
  deleteComment as remove,
  getCommentList,
  postComment as post,
  editComment as edit,
} from '../apis/comment.js';

export default function useComment() {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: commentList, refetch } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentList({ postId }),
    staleTime: 1000 * 60,
  });

  // 댓글 작성
  const postComment = useMutation({
    mutationFn: ({ content, parentId }) => post({ postId, parentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: (error) => {
      const errorStatus = error.response.status;

      if (errorStatus === 400) {
        toast(TOAST.COMMENT_CREATE_FAIL);
      } else if (errorStatus === 404) {
        toast(TOAST.COMMENT_NOT_FOUND);
      }
    },
  });

  // 댓글 삭제
  const deleteComment = useMutation({
    mutationFn: ({ commentId }) => remove({ postId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: (error) => {
      const errorStatus = error.response.status;
      const errorCode = error.response.data.code;

      if (errorStatus === 400) {
        toast(TOAST.COMMENT_DELETE_FAIL);
      } else if (errorCode === 404 && errorCode === 3031) {
        toast(TOAST.POST_NOT_FOUND);
      } else if (errorCode === 404 && errorCode === 3020) {
        toast(TOAST.COMMENT_NOT_FOUND);
      }
    },
  });

  // 댓글 수정
  const editComment = useMutation({
    mutationFn: ({ commentId, content, parentId }) =>
      edit({ postId, commentId, content, parentId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: (error) => {
      const errorStatus = error.response.status;
      const errorCode = error.response.data.code;

      if (errorStatus === 400) {
        toast(TOAST.COMMENT_EDIT_FAIL);
      } else if (errorCode === 404 && errorCode === 3031) {
        toast(TOAST.POST_NOT_FOUND);
      } else if (errorCode === 404 && errorCode === 3020) {
        toast(TOAST.COMMENT_NOT_FOUND);
      }
    },
  });

  return { commentList, postComment, deleteComment, editComment, refetch };
}
