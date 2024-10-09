import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { getExamReview } from '@/apis';

import { useToast } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import { FetchLoading } from '@/components/Loading';
import { Icon } from '@/components/Icon';

import { QUERY_KEY, TOAST } from '@/constants';

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
  const [loading, setLoading] = useState();

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
        <Icon id='file' width='10' height='14' />
        <span className={styles.name}>{fileName}</span>
      </button>
      <DeleteModal
        id='exam-review-download'
        isOpen={isOpen}
        closeFn={() => setIsOpen(false)}
        redBtnFunction={handleDownload}
      />
      {loading && (
        <div className={styles.loading}>
          <FetchLoading>
            <span className={styles.text}>다운로드 중...</span>
          </FetchLoading>
        </div>
      )}
    </>
  );
}
