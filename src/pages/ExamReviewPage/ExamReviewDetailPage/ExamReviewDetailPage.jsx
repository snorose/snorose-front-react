import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { deleteExamReview, getReviewDetail } from '@/apis';

import { useScrap, useToast } from '@/hooks';

import { NotFoundPage } from '@/pages/NotFoundPage';

import { BackAppBar } from '@/components/AppBar';
import { CommentList } from '@/components/Comment';
import { DeleteModal, OptionModal } from '@/components/Modal';
import { FetchLoading } from '@/components/Loading';
import { Icon } from '@/components/Icon';
import { InputBar } from '@/components/InputBar';
import { ReviewContentItem } from '@/components/ReviewContentItem';
import { ReviewDownload } from '@/components/ReviewDownload';

import { dateFormat, convertToObject } from '@/utils';

import {
  LECTURE_TYPES,
  SEMESTERS,
  EXAM_TYPES,
  TOAST,
  FLEX_ALIGN,
} from '@/constants';

import styles from './ExamReviewDetailPage.module.css';

const COURSE_TYPE = convertToObject(LECTURE_TYPES);
const SEMESTER = convertToObject(SEMESTERS);
const EXAM_TYPE = convertToObject(EXAM_TYPES);

export default function ExamReviewDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['reviewDetail', postId],
    queryFn: () => getReviewDetail(postId),
    staleTime: 1000 * 60 * 5,
  });

  const deleteReview = useMutation({
    mutationFn: () => deleteExamReview(postId),
    onSuccess: () => {
      queryClient.removeQueries(['reviewList']);
      queryClient.removeQueries(['reviewDetail', postId]);
      queryClient.removeQueries(['reviewFile', postId]);

      toast(TOAST.EXAM_REVIEW.delete);
      navigate('/board/exam-review', { replace: true });
    },
    onError: ({ response }) => {
      const { status } = response;

      if (status === 500) {
        toast(TOAST.ERROR.SERVER);
        return;
      }

      toast(response.data.message);
    },
  });

  const { scrap, deleteScrap } = useScrap();
  const { toast } = useToast();

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const edit = () =>
    navigate(`/board/exam-review/${postId}/edit`, {
      state: data,
      replace: true,
    });

  if (isLoading) {
    return (
      <>
        <BackAppBar />
        <FetchLoading>게시글 불러오는 중...</FetchLoading>
      </>
    );
  }

  if (error?.response.status === 404) {
    return <NotFoundPage />;
  }

  if (isError) {
    return (
      <>
        <BackAppBar />
        <FetchLoading animation={false}>
          게시글을 불러오지 못했습니다.
        </FetchLoading>
      </>
    );
  }

  const {
    commentCount,
    createdAt,
    examType,
    fileName,
    isConfirmed,
    isDownloaded,
    isEdited,
    isOnline,
    isPF,
    isScrapped,
    isWriter,
    lectureName,
    lectureType,
    lectureYear,
    professor,
    questionDetail,
    scrapCount,
    semester,
    title,
    userDisplay,
  } = data ?? {};

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
          <Icon
            className={styles.more}
            onClick={() =>
              isWriter ? setIsOptionModalOpen(true) : setIsReportModalOpen(true)
            }
            id='ellipsis-vertical'
            width='3'
            height='11'
          />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>
          <ReviewContentItem tag='강의명' value={lectureName} />
          <ReviewContentItem tag='교수' value={professor} />
          <ReviewContentItem tag='강의 종류' value={COURSE_TYPE[lectureType]} />
          <ReviewContentItem
            tag='수강 학기'
            value={`${String(lectureYear % 100).padStart(2, '0')}-${SEMESTER[semester]}`}
          />
          <ReviewContentItem tag='시험 종류' value={EXAM_TYPE[examType]} />
          <ReviewContentItem tag='P/F 여부' value={isPF ? 'O' : 'X'} />
          <ReviewContentItem
            tag='온라인 수업 여부'
            value={isOnline ? 'O' : 'X'}
          />
          <ReviewContentItem
            tag='시험 유형 및 문항수'
            value={questionDetail}
            align={FLEX_ALIGN.flexStart}
          />
        </div>
        <ReviewDownload
          className={styles.fileDownload}
          fileName={fileName}
          isDownloaded={isDownloaded}
          isWriter={isWriter}
        />
        <div className={styles.actions}>
          <div className={styles.action}>
            <Icon
              className={styles.comment}
              id='comment'
              width='15'
              height='14'
              fill='#D9D9D9'
            />
            <span>{commentCount.toLocaleString()}</span>
          </div>
          <div
            className={styles.action}
            onClick={() => (isScrapped ? deleteScrap.mutate() : scrap.mutate())}
          >
            <Icon
              id='bookmark-fill'
              width='10'
              height='13'
              fill={isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <span>{scrapCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <CommentList commentCount={commentCount} />
      <InputBar />
      <OptionModal
        id={isConfirmed ? 'confirmed-exam-review-option' : 'exam-review-option'}
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
        closeFunction={() => setIsDeleteModalOpen(false)}
        redBtnFunction={() => deleteReview.mutate()}
      />
      <OptionModal
        id='report'
        isOpen={isReportModalOpen}
        setIsOpen={setIsReportModalOpen}
        closeFn={() => setIsReportModalOpen(false)}
      />
    </main>
  );
}
