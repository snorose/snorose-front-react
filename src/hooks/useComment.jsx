import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  deleteComment as remove,
  postComment as post,
  editComment as edit,
} from '@/apis';

import { useToast } from '@/hooks';

import {
  deleteIfTargetComment,
  editIfTargetComment,
  flatPaginationCache,
  toPaginationCacheFormat,
} from '@/utils';

import {
  COMMENT_ACTION_TYPE,
  MUTATION_KEY,
  QUERY_KEY,
  TOAST,
} from '@/constants';

export default function useComment() {
  const { postId } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateCommentCache = (actionIfTargetComment) => {
    queryClient.setQueryData([QUERY_KEY.comments, postId], (prev) => {
      const flattenComments = flatPaginationCache(prev);
      const updatedComments = flattenComments.map(actionIfTargetComment);
      return toPaginationCacheFormat(updatedComments);
    });
  };

  const updateCommentCountCache = ({ type }) => {
    queryClient.setQueryData([QUERY_KEY.post, postId], (prev) => ({
      ...prev,
      commentCount:
        type === COMMENT_ACTION_TYPE.create
          ? prev.commentCount + 1
          : prev.commentCount - 1,
    }));
  };

  const onError = ({ response }) => {
    toast(response.data.message);
  };

  const createComment = useMutation({
    mutationKey: [MUTATION_KEY.createComment],
    mutationFn: async ({ content, parentId }) => {
      return await post({ postId, parentId, content });
    },
    onSuccess: (newComment) => {
      const { parentId } = newComment;

      queryClient.setQueryData([QUERY_KEY.comments, postId], (prev) => {
        const flattenComments = flatPaginationCache(prev);

        if (parentId) {
          const newComments = flattenComments.map((comment) =>
            comment.id === parentId
              ? { ...comment, children: [...comment.children, newComment] }
              : comment
          );
          return toPaginationCacheFormat(newComments);
        }

        const newComments = [...flattenComments, newComment];
        return toPaginationCacheFormat(newComments);
      });

      updateCommentCountCache({ type: COMMENT_ACTION_TYPE.create });
      toast(TOAST.COMMENT.create);
    },
    onError,
  });

  const deleteComment = useMutation({
    mutationKey: [MUTATION_KEY.deleteComment],
    mutationFn: async ({ commentId }) => {
      return await remove({ postId, commentId });
    },
    onSuccess: (deletedComment) => {
      const { id } = deletedComment;

      updateCommentCache((comment) =>
        deleteIfTargetComment({
          comment,
          targetId: id,
        })
      );

      updateCommentCountCache({ type: COMMENT_ACTION_TYPE.delete });
      toast(TOAST.COMMENT.delete);
    },
    onError,
  });

  const editComment = useMutation({
    mutationKey: [MUTATION_KEY.editComment],
    mutationFn: async ({ commentId, content, parentId }) => {
      return await edit({ postId, commentId, content, parentId });
    },
    onSuccess: (editedComment) => {
      const { id, content } = editedComment;

      updateCommentCache((comment) =>
        editIfTargetComment({
          comment,
          targetId: id,
          content,
        })
      );

      toast(TOAST.COMMENT.edit);
    },
    onError,
  });

  return {
    createComment,
    deleteComment,
    editComment,
  };
}
