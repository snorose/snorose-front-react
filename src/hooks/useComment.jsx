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
import { TOAST } from '@/constants';

export default function useComment() {
  const { postId } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const postComment = useMutation({
    mutationFn: async ({ content, parentId }) => {
      return await post({ postId, parentId, content });
    },
    onSuccess: ({ data }) => {
      const { result: newComment } = data;
      const { parentId } = newComment;

      queryClient.setQueryData(['comments', postId], (prev) => {
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

      toast(TOAST.COMMENT.create);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  const deleteComment = useMutation({
    mutationFn: async ({ commentId }) => {
      return await remove({ postId, commentId });
    },
    onSuccess: ({ data }) => {
      const { result: deletedComment } = data;
      const { id } = deletedComment;

      queryClient.setQueryData(['comments', postId], (prev) => {
        const flattenComments = flatPaginationCache(prev);
        const updatedComments = flattenComments.map((comment) =>
          deleteIfTargetComment({
            comment,
            targetId: id,
          })
        );
        return toPaginationCacheFormat(updatedComments);
      });

      toast(TOAST.COMMENT.delete);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  const editComment = useMutation({
    mutationFn: async ({ commentId, content, parentId }) => {
      return await edit({ postId, commentId, content, parentId });
    },
    onSuccess: ({ data }) => {
      const { result: editedComment } = data;
      const { id, content } = editedComment;

      queryClient.setQueryData(['comments', postId], (prev) => {
        const flattenComments = flatPaginationCache(prev);
        const updatedComments = flattenComments.map((comment) =>
          editIfTargetComment({
            comment,
            targetId: id,
            content,
          })
        );
        return toPaginationCacheFormat(updatedComments);
      });

      toast(TOAST.COMMENT.edit);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  return {
    postComment,
    deleteComment,
    editComment,
  };
}
