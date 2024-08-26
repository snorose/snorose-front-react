import { useLocation } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks';
import { TOAST } from '@/constants';

import { postLike as LikeApi, deleteLike as DeleteLikeApi } from '@/apis';

export default function useLike({ type, typeId }) {
  const { pathname } = useLocation();
  const currentBoard = pathname.split('/')[2];
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const like = useMutation({
    mutationFn: () => LikeApi(type, typeId),
    onSuccess: () => {
      if (currentBoard === 'exam-review') {
        queryClient.invalidateQueries(['reviewDetail', typeId]);
      } else {
        queryClient.invalidateQueries(['postContent', typeId]);
      }
    },
    onError: (error) => {
      if (error?.response?.status === 403) {
        toast(TOAST.LIKE_SELF_ERROR);
      }
    },
  });

  const deleteLike = useMutation({
    mutationFn: () => DeleteLikeApi(type, typeId),
    onSuccess: () => {
      if (currentBoard === 'exam-review') {
        queryClient.invalidateQueries(['reviewDetail', typeId]);
      } else {
        queryClient.invalidateQueries(['postContent', typeId]);
      }
    },
    onError: (error) => {
      if (error?.response?.status === 403) {
        toast(TOAST.LIKE_SELF_ERROR);
      }
    },
  });

  return { like, deleteLike };
}
