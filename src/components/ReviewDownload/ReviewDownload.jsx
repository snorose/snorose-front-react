import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { getExamReview } from '@/apis';

import { useToast } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import { Icon } from '@/components/Icon';

import { TOAST } from '@/constants';

import styles from './ReviewDownload.module.css';

export default function ReviewDownload({
  className,
  fileName,
  isDownloaded,
  isWriter,
}) {
  const { postId } = useParams();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const downloadExamReview = async () => {
    const data = await getExamReview(postId, fileName);

    const blob = new Blob([data.data], {
      type: 'application/pdf',
    });
    const fileUrl = window.URL.createObjectURL(blob);
    const downloadedFileName = `${fileName.split('.')[0]}_${Date.now()}.pdf`;
    const link = document.createElement('a');
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', downloadedFileName);
    link.click();
    window.URL.revokeObjectURL(fileUrl);
  };

  const handleDownload = async () => {
    try {
      await downloadExamReview();

      const reviewDetail = queryClient.getQueryData(['reviewDetail', postId]);
      const { isDownloaded } = reviewDetail ?? { isDownloaded: false };

      queryClient.setQueryData(['reviewDetail', postId], (prev) => {
        return { ...prev, isDownloaded: true };
      });

      queryClient.setQueryData(['myPageUserInfo'], (prev) => ({
        ...prev,
        balance: isDownloaded ? prev.balance : prev.balance - 50,
      }));

      toast(TOAST.EXAM_REVIEW.download);
    } catch ({ response }) {
      const text = await response.data.text();
      const { message } = JSON.parse(text);
      toast(message);
    }
  };

  return (
    <>
      <button
        className={` ${styles.layout} ${className}`}
        onClick={(event) => {
          event.stopPropagation();

          if (isWriter || isDownloaded) {
            handleDownload();
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
        closeFunction={() => setIsOpen(false)}
        redBtnFunction={handleDownload}
      />
    </>
  );
}
