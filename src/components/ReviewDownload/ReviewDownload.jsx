import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { DeleteModal } from '../Modal';
import { Icon } from '../Icon';

import { downloadExamReview } from '../../apis';

import styles from './ReviewDownload.module.css';

export default function ReviewDownload({ className, fileName }) {
  const { postId } = useParams();
  const { data } = useQuery({
    queryKey: ['reviewFile', postId],
    queryFn: () => downloadExamReview(postId, fileName),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 365,
  });
  const [isOpen, setIsOpen] = useState(false);
  const onDownload = () => {
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
        redBtnFuction={onDownload}
      />
    </>
  );
}
