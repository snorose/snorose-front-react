import {
  useReportPostMutation,
  useReportUserMutation,
  useReportCommentMutation,
} from '@/feature/board/hook/useReport';
import { parseReportType } from '@/feature/board/lib/parseReportType';
import { useCommentContext } from '@/feature/comment/context';
import { useRef } from 'react';

export function useReportHandler(modal, setModal, data) {
  const { commentId } = useCommentContext();
  const { mutateAsync: reportPostMutate } = useReportPostMutation();
  const { mutateAsync: reportUserMutate } = useReportUserMutation();
  const { mutateAsync: reportCommentMutate } = useReportCommentMutation();

  const submitDisabledRef = useRef(false);

  const parsedReportType = parseReportType(modal.type || '');

  // 게시글 신고
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

  // 이용자 신고
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

  // 댓글 신고
  const handleCommentReport = async () => {
    if (!modal.type || !data?.id || submitDisabledRef.current) return;

    submitDisabledRef.current = true;
    try {
      await reportCommentMutate({
        commentId: commentId,
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
