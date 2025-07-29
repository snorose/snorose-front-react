import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import {
  deleteComment as remove,
  postComment as post,
  editComment as edit,
} from '@/apis';

import { useAuth, useToast } from '@/shared/hook';
import {
  getBoard,
  flatPaginationCache,
  toPaginationCacheFormat,
} from '@/shared/lib';
import {
  MUTATION_KEY,
  QUERY_KEY,
  TOAST,
  COMMENT_ACTION_TYPE,
} from '@/shared/constant';

import {
  deleteIfTargetComment,
  editIfTargetComment,
} from '@/feature/comment/lib';

export default function useComment() {
  const [loading, setLoading] = useState();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { invalidUserInfoQuery } = useAuth();
  const currentBoard = getBoard(pathname.split('/')[2]);

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

  const onSettled = () => {
    setLoading(false);
  };

  const createComment = useMutation({
    mutationKey: [MUTATION_KEY.createComment],
    mutationFn: async ({ content, parentId }) => {
      return await post({ postId, parentId, content });
    },
    onSuccess: (newComment) => {
      const { parentId, pointDifference } = newComment;

      invalidUserInfoQuery();

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
      !pointDifference
        ? toast({ message: TOAST.COMMENT.createNoPoints, type: 'defaultDark' })
        : toast({ message: TOAST.COMMENT.create, type: 'defaultDark' });
    },
    onError,
    onSettled,
  });

  const deleteComment = useMutation({
    mutationKey: [MUTATION_KEY.deleteComment],
    mutationFn: async ({ commentId }) => {
      return await remove({ postId, commentId });
    },
    onSuccess: (deletedComment) => {
      // const { id, pointDifference } = deletedComment;
      const { id } = deletedComment;

      invalidUserInfoQuery();
      updateCommentCache((comment) =>
        deleteIfTargetComment({
          comment,
          targetId: id,
        })
      );

      updateCommentCountCache({ type: COMMENT_ACTION_TYPE.delete });
      // !pointDifference; // pointDifference값 백엔 수정 되면 이 코드로 다시 변경
      currentBoard.id === 23 || currentBoard.id === 32
        ? toast({ message: TOAST.COMMENT.deleteNoPoints, type: 'defaultDark' })
        : toast({ message: TOAST.COMMENT.delete, type: 'defaultDark' });
    },
    onError,
    onSettled,
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
    onSettled,
  });

  return {
    createComment,
    deleteComment,
    editComment,
    loading,
    setLoading,
  };
}
