import { useQueryClient, useMutation } from '@tanstack/react-query';

import { postLike as LikeApi, deleteLike as DeleteLikeApi } from '@/apis';

import { useToast } from '@/hooks';

export default function useLike({ type, typeId }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const like = useMutation({
    mutationFn: () => LikeApi(type, typeId),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', typeId]);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  const deleteLike = useMutation({
    mutationFn: () => DeleteLikeApi(type, typeId),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', typeId]);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  return { like, deleteLike };
}
