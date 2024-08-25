import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { scrap as ScrapApi, deleteScrap as deleteScrapApi } from '../apis';

export default function useScrap() {
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
