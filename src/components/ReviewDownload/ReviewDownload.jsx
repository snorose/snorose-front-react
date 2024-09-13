import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { downloadExamReview, updatePoint } from '@/apis';

import { useAuth, useToast } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import { Icon } from '@/components/Icon';

import { POINT_CATEGORY_ENUM, POINT_SOURCE_ENUM, TOAST } from '@/constants';

import styles from './ReviewDownload.module.css';

export default function ReviewDownload({
  className,
  fileName,
  isDownloaded,
  isWriter,
}) {
  const { postId } = useParams();
  const { userInfo } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const download = async () => {
    const data = await downloadExamReview(postId, fileName);

    const blob = new Blob([data.data], {
      type: 'application/pdf',
    });
    const fileUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', fileName);
    link.click();
    window.URL.revokeObjectURL(fileUrl);
  };

  const losePoint = useMutation({
    mutationFn: ({ sourceId }) =>
      updatePoint({
        userId: userInfo.userId,
        category: POINT_CATEGORY_ENUM.EXAM_REVIEW_DOWNLOAD,
        source: POINT_SOURCE_ENUM.REVIEW,
        sourceId,
      }),
    onSuccess: () => {
      download();
      queryClient.setQueryData(['reviewDetail', postId], (prev) => {
        return { ...prev, isDownloaded: true };
      });
      toast(TOAST.EXAM_REVIEW.download);
    },
    onError: ({ response }) => {
      const { status } = response;

      if (status === 500) {
        toast(TOAST.SERVER_ERROR['500']);
        return;
      }

      toast(response.data.message);
    },
  });

  return (
    <>
      <button
        className={` ${styles.layout} ${className}`}
        onClick={(event) => {
          event.stopPropagation();

          if (isWriter || isDownloaded) {
            losePoint.mutate({ sourceId: postId });
            return;
          }

          setIsOpen(true);
        }}
      >
        <Icon id='file' width='10' height='14' />
        <span>{fileName}</span>
      </button>
      <DeleteModal
        id='exam-review-download'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        redBtnFunction={() => {
          losePoint.mutate({ sourceId: postId });
        }}
      />
    </>
  );
}
