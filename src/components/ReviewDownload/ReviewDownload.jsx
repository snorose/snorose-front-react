import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { getExamReview } from '@/apis';

import { useToast } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import { FetchLoadingOverlay } from '@/components/Loading';
import { Icon } from '@/components/Icon';

import { LOADING_MESSAGE, QUERY_KEY, TOAST } from '@/constants';

import styles from './ReviewDownload.module.css';

const appendTimestampToFileName = (fileName) => {
  return fileName.replace('.pdf', `_${Date.now()}.pdf`);
};

export default function ReviewDownload({
  className,
  fileName,
  isDownloaded,
  isWriter,
}) {
  const { postId } = useParams();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState();

  const queryClient = useQueryClient();

  const downloadExamReview = async () => {
    const data = await getExamReview(postId, fileName);

    const blob = new Blob([data.data], {
      type: 'application/pdf',
    });
    const fileUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', appendTimestampToFileName(fileName));
    link.click();
    window.URL.revokeObjectURL(fileUrl);
  };

  const handleDownload = async () => {
    setLoading(true);

    try {
      await downloadExamReview();

      const reviewDetail = queryClient.getQueryData([QUERY_KEY.post, postId]);
      const { isDownloaded } = reviewDetail ?? { isDownloaded: false };

      queryClient.setQueryData([QUERY_KEY.post, postId], (prev) => {
        return { ...prev, isDownloaded: true };
      });

      queryClient.setQueryData([QUERY_KEY.userInfo], (prev) => ({
        ...prev,
        balance: isDownloaded ? prev.balance : prev.balance - 50,
      }));

      toast(TOAST.EXAM_REVIEW.download);
    } catch ({ response }) {
      const text = await response.data.text();
      const { message } = JSON.parse(text);
      toast(message);
    } finally {
      setLoading(false);
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
        <Icon id='file' width={10} height={14} />
        <span className={styles.name}>{fileName}</span>
      </button>
      <DeleteModal
        id='exam-review-download'
        isOpen={isOpen}
        closeFn={() => setIsOpen(false)}
        redBtnFunction={handleDownload}
      />
      {loading && (
        <FetchLoadingOverlay text={LOADING_MESSAGE.downloadExamReview} />
      )}
    </>
  );
}
