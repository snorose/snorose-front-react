import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  deleteComment as remove,
  postComment as post,
  editComment as edit,
} from '@/apis';

import { useToast } from '@/hooks';

import { flatPaginationCache, toPaginationCacheFormat } from '@/utils';
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
      queryClient.setQueryData(['comments', postId], (prev) => {
        const { result: newComment } = data;
        const { parentId } = newComment;
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

  const setAsDeleted = (comments, commentId) => {
    return comments.map((comment) =>
      comment.id === commentId ? { ...comment, isDeleted: true } : comment
    );
  };

  const deleteComment = useMutation({
    mutationFn: async ({ commentId }) => {
      return await remove({ postId, commentId });
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['comments', postId], (prev) => {
        const { result: deletedComment } = data;
        const { id, parentId } = deletedComment;
        const flattenComments = flatPaginationCache(prev);

        if (parentId) {
          const updatedComments = flattenComments.map((comment) =>
            comment.id === parentId
              ? {
                  ...comment,
                  children: setAsDeleted(comment.children, id),
                }
              : comment
          );
          return toPaginationCacheFormat(updatedComments);
        }

        const updatedComments = setAsDeleted(flattenComments, id);
        return toPaginationCacheFormat(updatedComments);
      });

      toast(TOAST.COMMENT.delete);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  const setAsUpdated = ({ comments, commentId, content }) => {
    return comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, content, isUpdated: true }
        : comment
    );
  };

  const editComment = useMutation({
    mutationFn: async ({ commentId, content, parentId }) => {
      return await edit({ postId, commentId, content, parentId });
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['comments', postId], (prev) => {
        const { result: editedComment } = data;
        const { id, parentId, content } = editedComment;
        const flattenComments = flatPaginationCache(prev);

        if (parentId) {
          const updatedComments = flattenComments.map((comment) =>
            comment.id === parentId
              ? {
                  ...comment,
                  children: setAsUpdated({
                    comments: comment.children,
                    commentId: id,
                    content,
                  }),
                }
              : comment
          );
          return toPaginationCacheFormat(updatedComments);
        }

        const updatedComments = setAsUpdated({
          comments: flattenComments,
          commentId: id,
          content,
        });
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
