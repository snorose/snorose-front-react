import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { downloadExamReview, updatePoint } from '@/apis';

import { useToast } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import { Icon } from '@//components/Icon';

import { POINT_CATEGORY_ENUM, POINT_SOURCE_ENUM, TOAST } from '@/constants';

import { USER } from '@/dummy/data';

import styles from './ReviewDownload.module.css';

export default function ReviewDownload({ className, fileName }) {
  const { postId } = useParams();
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ['reviewFile', postId],
    queryFn: () => downloadExamReview(postId, fileName),
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const [isOpen, setIsOpen] = useState(false);

  const download = () => {
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
        userId: USER.userId, // userId로 변경 필요
        category: POINT_CATEGORY_ENUM.EXAM_REVIEW_DOWNLOAD,
        source: POINT_SOURCE_ENUM.REVIEW,
        sourceId,
      }),
    onSuccess: () => {
      download();
      toast(TOAST.EXAM_REVIEW.download);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  return (
    <>
      <button
        className={` ${styles.layout} ${className}`}
        onClick={(event) => {
          event.stopPropagation();
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
