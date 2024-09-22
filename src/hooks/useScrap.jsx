import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { scrap as scrapApi, unscrap as unscrapApi } from '@/apis';

import { useToast } from '@/hooks';

import { MUTATION_KEY, QUERY_KEY } from '@/constants';

export default function useScrap() {
  const { toast } = useToast();
  const { postId } = useParams();

  const queryClient = useQueryClient();

  const updateScrapCache = ({ isScrapped, scrapCount }) => {
    queryClient.setQueryData([QUERY_KEY.post, postId], (prev) => ({
      ...prev,
      isScrapped,
      scrapCount,
    }));
  };

  const onSuccess = ({ isScrapped, scrapCount }) => {
    updateScrapCache({
      isScrapped,
      scrapCount,
    });
  };

  const onError = ({ response }) => {
    toast(response.data.message);
  };

  const scrap = useMutation({
    mutationKey: [MUTATION_KEY.scrap],
    mutationFn: () => scrapApi({ postId }),
    onSuccess,
    onError,
  });

  const unscrap = useMutation({
    mutationKey: [MUTATION_KEY.unscrap],
    mutationFn: () => unscrapApi({ postId }),
    onSuccess,
    onError,
  });

  return { scrap, unscrap };
}
