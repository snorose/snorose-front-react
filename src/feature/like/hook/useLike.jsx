import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { like as likeApi, unlike as unlikeApi } from '@/apis';

import { useToast } from '@/shared/hook';
import { flatPaginationCache, toPaginationCacheFormat } from '@/shared/lib';
import { MUTATION_KEY, QUERY_KEY, LIKE_TYPE } from '@/shared/constant';

import { updateLikeIfTargetComment } from '@/feature/comment/lib';

export default function useLike({ type, sourceId }) {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { toast } = useToast();

  const updatePostLikeCache = ({ isLiked, likeCount }) => {
    queryClient.setQueryData(QUERY_KEY.post(postId), (prev) => ({
      ...prev,
      isLiked,
      likeCount,
    }));
  };

  const updateCommentLikeCache = ({ targetId, isLiked, likeCount }) => {
    queryClient.setQueryData([QUERY_KEY.comments, postId], (prev) => {
      const flattenComments = flatPaginationCache(prev);
      const updatedComments = flattenComments.map((comment) =>
        updateLikeIfTargetComment({
          comment,
          targetId,
          isLiked,
          likeCount,
        })
      );
      return toPaginationCacheFormat(updatedComments);
    });
  };

  const onSuccess = ({ isLiked, likeCount }) => {
    if (type === LIKE_TYPE.post) {
      updatePostLikeCache({ isLiked, likeCount });
      return;
    }

    updateCommentLikeCache({ targetId: sourceId, isLiked, likeCount });
  };

  const onError = ({ response }) => {
    toast(response.data.message);
  };

  const like = useMutation({
    mutationKey: [MUTATION_KEY.like],
    mutationFn: async () => {
      return await likeApi({ type, sourceId });
    },
    onSuccess,
    onError,
  });

  const unlike = useMutation({
    mutationKey: [MUTATION_KEY.unlike],
    mutationFn: () => unlikeApi({ type, sourceId }),
    onSuccess,
    onError,
  });

  return { like, unlike };
}
