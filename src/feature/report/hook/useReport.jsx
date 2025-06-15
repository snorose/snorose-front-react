import { useMutation } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { useRef } from 'react';

import { reportPost, reportUser, reportComment } from '@/apis';

import { MUTATION_KEY } from '@/shared/constant';
import { useToast } from '@/shared/hook';
import { getBoard } from '@/shared/lib';

import { parseReportType } from '@/feature/board/lib/parseReportType';
import { useCommentContext } from '@/feature/comment/context';

// 게시글 신고 훅
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

// 유저 신고 훅
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

// 댓글 신고 훅
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

// 통합 신고 핸들러 훅
export function useReportHandler(modal, setModal, data) {
  const { commentId } = useCommentContext();
  const { mutateAsync: reportPostMutate } = useReportPostMutation();
  const { mutateAsync: reportUserMutate } = useReportUserMutation();
  const { mutateAsync: reportCommentMutate } = useReportCommentMutation();

  const submitDisabledRef = useRef(false);
  const parsedReportType = parseReportType(modal.type || '');

  const handlePostReport = async () => {
    if (!modal.type || submitDisabledRef.current) return;
    submitDisabledRef.current = true;
    try {
      await reportPostMutate({ reportType: modal.type });
    } catch (error) {
      console.error(error);
    } finally {
      submitDisabledRef.current = false;
    }
  };

  const handleUserReport = async () => {
    if (!modal.type || !data?.userId || submitDisabledRef.current) return;
    submitDisabledRef.current = true;
    try {
      await reportUserMutate({
        encryptedTargetUserId: data.userId,
        reportType: modal.type,
      });
    } catch (error) {
      console.error(error);
    } finally {
      submitDisabledRef.current = false;
    }
  };

  const handleCommentReport = async () => {
    if (!modal.type || !data?.id || submitDisabledRef.current) return;
    submitDisabledRef.current = true;
    try {
      await reportCommentMutate({
        commentId,
        reportType: modal.type,
      });
    } catch (error) {
      console.error(error);
    } finally {
      submitDisabledRef.current = false;
    }
  };

  const handleReport = async () => {
    if (!modal.type || submitDisabledRef.current) return;

    switch (parsedReportType) {
      case 'post':
        await handlePostReport();
        break;
      case 'user':
        await handleUserReport();
        break;
      case 'comment':
        await handleCommentReport();
        break;
      default:
        break;
    }

    setModal({ id: null, type: null });
  };

  return {
    handleReport,
  };
}
