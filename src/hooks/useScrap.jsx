import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { scrap as ScrapApi, deleteScrap as deleteScrapApi } from '@/apis';

import { useToast } from '@/hooks';

import { SCRAP_TYPE } from '@/constants';

export default function useScrap() {
  const { toast } = useToast();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const currentBoard = pathname.split('/')[2];
  const queryClient = useQueryClient();

  const updateScrapCache = ({ type, isScrapped, scrapCount }) => {
    queryClient.setQueryData([type, postId], (prev) => ({
      ...prev,
      isScrapped,
      scrapCount,
    }));
  };

  const scrap = useMutation({
    mutationFn: () => ScrapApi({ postId }),
    onSuccess: ({ data }) => {
      const { result } = data;
      const { isScrapped, scrapCount } = result;

      updateScrapCache({
        type:
          currentBoard === 'exam-review' ? SCRAP_TYPE.review : SCRAP_TYPE.post,
        isScrapped,
        scrapCount,
      });
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  const deleteScrap = useMutation({
    mutationFn: () => deleteScrapApi({ postId }),
    onSuccess: ({ data }) => {
      const { result } = data;
      const { isScrapped, scrapCount } = result;

      updateScrapCache({
        type:
          currentBoard === 'exam-review' ? SCRAP_TYPE.review : SCRAP_TYPE.post,
        isScrapped,
        scrapCount,
      });
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  return { scrap, deleteScrap };
}
