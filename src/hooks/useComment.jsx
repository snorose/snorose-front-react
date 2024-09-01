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
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  // 댓글 삭제
  const deleteComment = useMutation({
    mutationFn: ({ commentId }) => remove({ postId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  // 댓글 수정
  const editComment = useMutation({
    mutationFn: ({ commentId, content, parentId }) =>
      edit({ postId, commentId, content, parentId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  return { commentList, postComment, deleteComment, editComment, refetch };
}
