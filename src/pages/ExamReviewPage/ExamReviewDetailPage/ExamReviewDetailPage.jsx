import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { deleteExamReview, getReviewDetail, updatePoint } from '@/apis';

import { useScrap } from '@/hooks';
import { useToast } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { CommentList } from '@/components/Comment';
import { DeleteModal, OptionModal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { InputBar } from '@/components/InputBar';
import { ReviewContentItem } from '@/components/ReviewContentItem';
import { ReviewDownload } from '@/components/ReviewDownload';

import { dateFormat } from '@/utils/date.js';
import { convertToObject } from '@/utils/convertDS.js';

import {
  LECTURE_TYPES,
  POINT_CATEGORY_ENUM,
  POINT_SOURCE_ENUM,
  SEMESTERS,
  EXAM_TYPES,
  TOAST,
} from '@/constants';

import styles from './ExamReviewDetailPage.module.css';

const COURSE_TYPE = convertToObject(LECTURE_TYPES);
const SEMESTER = convertToObject(SEMESTERS);
const EXAM_TYPE = convertToObject(EXAM_TYPES);

export default function ExamReviewDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['reviewDetail', postId],
    queryFn: () => getReviewDetail(postId),
    staleTime: 1000 * 60 * 5,
  });

  const deleteReview = useMutation({
    mutationFn: () => deleteExamReview(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviewList']);
      queryClient.removeQueries(['reviewDetail', postId]);
      queryClient.removeQueries(['reviewFile', postId]);

      updatePoint({
        userId: 62, // userId로 변경 필요
        category: POINT_CATEGORY_ENUM.EXAM_REVIEW_DELETE,
        source: POINT_SOURCE_ENUM.REVIEW,
        sourceId: postId,
      }).then(({ status }) => {
        if (status === 200) {
          toast(TOAST.EXAM_REVIEW_DELETE);
        }
      });
      navigate('/board/exam-review');
    },
  });

  const { scrap, deleteScrap } = useScrap();
  const { toast } = useToast();

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (data === undefined) return null;

  const edit = () =>
    navigate(`/board/exam-review/${postId}/edit`, {
      state: data,
      replace: true,
    });
  const remove = () => deleteReview.mutate();

  const {
    userDisplay,
    isWriter,
    title,
    commentCount,
    scrapCount,
    isScrap,
    createdAt,
    lectureName,
    professor,
    lectureYear,
    semester,
    lectureType,
    isPF,
    examType,
    isConfirmed,
    fileName,
    isEdited,
    questionDetail,
  } = data;

  return (
    <main>
      <div className={styles.top}>
        <BackAppBar />
        <div className={styles.displayBox}>
          <div className={styles.displayBoxLeft}>
            <Icon
              className={styles.cloudIcon}
              id='cloud'
              width='25'
              height='16'
            />
            <span>{userDisplay}</span>
            <span className={styles.dot}></span>
            <span>{dateFormat(createdAt)}</span>
            {isEdited && <span>&nbsp;(수정됨)</span>}
            {isConfirmed && (
              <Icon
                className={styles.checkCircleIcon}
                id='check-circle'
                width='15'
                height='15'
              />
            )}
          </div>
          <div className={styles.actions}>
            <Icon
              id={isScrap ? 'bookmark-fill' : 'bookmark-line'}
              width='14'
              height='18'
              fill='#5F86BF'
              onClick={() => (isScrap ? deleteScrap.mutate() : scrap.mutate())}
            />
            {isWriter && (
              <Icon
                onClick={() => setIsOptionModalOpen(true)}
                id='ellipsis-vertical'
                width='3'
                height='11'
              />
            )}
          </div>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>
          <ReviewContentItem tag='강의명' value={lectureName} />
          <ReviewContentItem tag='교수' value={professor} />
          <ReviewContentItem tag='강의 종류' value={COURSE_TYPE[lectureType]} />
          <ReviewContentItem
            tag='수강 학기'
            value={`${lectureYear % 100}-${SEMESTER[semester]}`}
          />
          <ReviewContentItem tag='시험 종류' value={EXAM_TYPE[examType]} />
          <ReviewContentItem tag='P/F 여부' value={isPF ? 'O' : 'X'} />
          <ReviewContentItem tag='시험 유형 및 문항수' value={questionDetail} />
        </div>
        <ReviewDownload className={styles.fileDownload} fileName={fileName} />
        <div className={styles.counts}>
          <div className={styles.count}>
            <Icon
              className={styles.comment}
              id='comment'
              width='15'
              height='14'
              fill='#5F86BF'
            />
            <span>{commentCount.toLocaleString()}</span>
          </div>
          <div className={styles.count}>
            <Icon id='bookmark-fill' width='10' height='13' fill='#5F86BF' />
            <span>{scrapCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <CommentList />
      <InputBar />
      <OptionModal
        id='exam-review-edit'
        isOpen={isOptionModalOpen}
        setIsOpen={setIsOptionModalOpen}
        closeFn={() => setIsOptionModalOpen(false)}
        functions={{
          pencil: edit,
          trash: () => {
            setIsOptionModalOpen(false);
            setIsDeleteModalOpen(true);
          },
        }}
      />
      <DeleteModal
        id='exam-review-delete'
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        redBtnFunction={remove}
      />
    </main>
  );
}
