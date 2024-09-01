import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { useToast } from '@/hooks';
import { TOAST, POINT_CATEGORY_ENUM, POINT_SOURCE_ENUM } from '@/constants';

import {
  deleteComment as remove,
  getCommentList,
  postComment as post,
  editComment as edit,
  updatePoint,
} from '@/apis';

import { USER } from '@/dummy/data';

export default function useComment() {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: commentList, refetch } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentList({ postId }),
    staleTime: 1000 * 60,
  });

  // 댓글 생성
  const postComment = useMutation({
    mutationFn: async ({ content, parentId }) => {
      const response = await post({ postId, parentId, content });
      const newCommentId = response.data.result.id;
      if (response.status === 201) {
        await updatePoint({
          userId: USER.userId, // 실제 userId로 교체해야 합니다.
          category: POINT_CATEGORY_ENUM.COMMENT_CREATE,
          source: POINT_SOURCE_ENUM.COMMENT,
          sourceId: newCommentId,
        });
      }
    },
    onSuccess: () => {
      toast(TOAST.COMMENT.create);
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  // 댓글 삭제
  const deleteComment = useMutation({
    mutationFn: async ({ commentId }) => {
      const response = await remove({ postId, commentId });
      if (response.status === 200) {
        await updatePoint({
          userId: USER.userId, // 실제 userId로 교체해야 합니다.
          category: POINT_CATEGORY_ENUM.COMMENT_DELETE,
          source: POINT_SOURCE_ENUM.COMMENT,
          sourceId: commentId,
        });
      }
    },
    onSuccess: () => {
      toast(TOAST.COMMENT.delete);
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
