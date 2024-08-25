import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { scrap as ScrapApi, deleteScrap as deleteScrapApi } from '../apis';

export default function useScrap() {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const scrap = useMutation({
    mutationFn: () => ScrapApi({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviewDetail', postId]);
    },
  });

  const deleteScrap = useMutation({
    mutationFn: () => deleteScrapApi({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviewDetail', postId]);
    },
  });

  return { scrap, deleteScrap };
}
