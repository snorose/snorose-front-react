import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { scrap as ScrapApi, deleteScrap as deleteScrapApi } from '../apis';

import { useToast } from '@/hooks';
import { TOAST } from '@/constants/toast.js';

export default function useScrap() {
  const { toast } = useToast();
  const { postId } = useParams();
  const { pathname } = useLocation();

  const currentBoard = pathname.split('/')[2];

  const queryClient = useQueryClient();

  const scrap = useMutation({
    mutationFn: () => ScrapApi({ postId }),
    onSuccess: () => {
      if (currentBoard === 'exam-review') {
        queryClient.invalidateQueries(['reviewDetail', postId]);
      } else {
        queryClient.invalidateQueries(['postContent', postId]);
      }
    },
    onError: (error) => {
      if (error.response.data.code === 3801) {
        toast(TOAST.NO_SELF_SCRAP);
      }
    },
  });

  const deleteScrap = useMutation({
    mutationFn: () => deleteScrapApi({ postId }),
    onSuccess: () => {
      if (currentBoard === 'exam-review') {
        queryClient.invalidateQueries(['reviewDetail', postId]);
      } else {
        queryClient.invalidateQueries(['postContent', postId]);
      }
    },
  });

  return { scrap, deleteScrap };
}
