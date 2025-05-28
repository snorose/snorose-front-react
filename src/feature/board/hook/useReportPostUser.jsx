import { reportPost, reportUser } from '@/apis';
import { MUTATION_KEY } from '@/shared/constant';
import { useToast } from '@/shared/hook';
import { getBoard } from '@/shared/lib';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

export function useReportPostMutation() {
  const { toast } = useToast();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const currentBoard = getBoard(pathname.split('/')[2]);

  return useMutation({
    mutationKey: [MUTATION_KEY.reportPost],
    mutationFn: (body) => reportPost(currentBoard?.id, postId, body),
    onSuccess: ({ message }) => {
      toast(message);
    },
    onError: () => {
      toast('신고에 실패했습니다.');
    },
  });
}

export function useReportUserMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationKey: [MUTATION_KEY.reportUser],
    mutationFn: (body) => reportUser(body),
    onSuccess: ({ message }) => {
      toast(message);
    },
    onError: () => {
      toast('신고에 실패했습니다.');
    },
  });
}
