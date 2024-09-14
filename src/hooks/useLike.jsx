import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { postLike as LikeApi, deleteLike as DeleteLikeApi } from '@/apis';

import { useToast } from '@/hooks';
import {
  flatPaginationCache,
  toPaginationCacheFormat,
  updateLikeIfTargetComment,
} from '@/utils';
import { LIKE_TYPE } from '@/constants';

export default function useLike({ type, typeId }) {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { toast } = useToast();

  const updatePostLikeCache = ({ isLiked, likeCount }) => {
    queryClient.setQueryData(['postContent', postId], (prev) => ({
      ...prev,
      isLiked,
      likeCount,
    }));
  };

  const updateCommentLikeCache = ({ commentId, isLiked, likeCount }) => {
    queryClient.setQueryData(['comments', postId], (prev) => {
      const flattenComments = flatPaginationCache(prev);
      const updatedComments = flattenComments.map((comment) =>
        updateLikeIfTargetComment({ comment, commentId, isLiked, likeCount })
      );
      return toPaginationCacheFormat(updatedComments);
    });
  };

  const like = useMutation({
    mutationFn: () => LikeApi(type, typeId),
    onSuccess: ({ data }) => {
      const { result } = data;
      const { isLiked, likeCount } = result;

      if (type === LIKE_TYPE.post) {
        updatePostLikeCache({ isLiked, likeCount });
        return;
      }

      updateCommentLikeCache({ commentId: typeId, isLiked, likeCount });
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  const deleteLike = useMutation({
    mutationFn: () => DeleteLikeApi(type, typeId),
    onSuccess: ({ data }) => {
      const { result } = data;
      const { isLiked, likeCount } = result;

      if (type === LIKE_TYPE.post) {
        updatePostLikeCache({ isLiked, likeCount });
        return;
      }

      updateCommentLikeCache({ commentId: typeId, isLiked, likeCount });
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  return { like, deleteLike };
}
