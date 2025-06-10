import { reportPost, reportUser } from '@/apis';
import { MUTATION_KEY } from '@/shared/constant';
import { useToast } from '@/shared/hook';
import { getBoard } from '@/shared/lib';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { reportComment } from '@/apis';

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

export function useReportCommentMutation() {
  const { toast } = useToast();
  const { postId } = useParams();

  return useMutation({
    mutationKey: [MUTATION_KEY.reportComment],
    mutationFn: ({ commentId, reportType }) =>
      reportComment(postId, commentId, { reportType }),
    onSuccess: ({ message }) => {
      toast(message);
    },
    onError: () => {
      toast('신고에 실패했습니다.');
    },
  });
}

// export const useReportCommentMutation = (postId, commentId) => {
//   const { toast } = useToast();
//   const { setIsReportModalOpen, reportConfirmModal, resetCommentState } =
//     useCommentContext();

//   return useMutation({
//     mutationKey: [MUTATION_KEY.reportComment],
//     mutationFn: (body) => reportComment(postId, commentId, body),
//     onSuccess: ({ message }) => {
//       setIsReportModalOpen(false);
//       reportConfirmModal.closeModal();
//       toast(message);
//       resetCommentState();
//     },
//     onError: () => {
//       toast('댓글 신고에 실패했습니다.');
//       resetCommentState();
//     },
//   });
// };
