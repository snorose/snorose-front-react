import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getReviewDetail } from '@/apis';

import {
  BackAppBar,
  FetchLoading,
  FetchLoadingOverlay,
  Icon,
} from '@/shared/component';
import { dateFormat } from '@/shared/lib';
import { QUERY_KEY } from '@/shared/constant';

import { NotFoundPage } from '@/page/etc';

import { CommentInput, CommentListSuspense } from '@/feature/comment/component';
import {
  ExamReviewModalRenderer,
  ReviewContentItem,
  ReviewDownload,
} from '@/feature/exam/component';
import { convertToObject } from '@/feature/exam/lib';
import {
  LECTURE_TYPES,
  SEMESTERS,
  EXAM_TYPES,
  FLEX_ALIGN,
} from '@/feature/exam/constant';
import { useScrap } from '@/feature/scrap/hook';
import { useReportHandler } from '@/feature/report/hook/useReport';
import { useDeleteExamReviewHandler } from '@/feature/exam/hook/useDeleteExamReviewHandler';

import styles from './ExamReviewPage.module.css';
import { ModalContext } from '@/shared/context/ModalContext';
import { useModalReset } from '@/shared/hook/useBlocker';

import cloudLogo from '@/assets/images/cloudLogo.svg';

const COURSE_TYPE = convertToObject(LECTURE_TYPES);
const SEMESTER = convertToObject(SEMESTERS);
const EXAM_TYPE = convertToObject(EXAM_TYPES);

export default function ExamReviewPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { scrap, unscrap } = useScrap();
  const { modal, setModal } = useContext(ModalContext);

  // 페이지 언마운트 시 모달 상태 초기화
  useModalReset();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getReviewDetail(postId),
    staleTime: 1000 * 60 * 5,
  });

  const { handleReport } = useReportHandler(modal, setModal, data);
  const { handleDelete } = useDeleteExamReviewHandler();

  const handleEdit = () => {
    setModal({ id: null, type: null });
    navigate(`/board/exam-review/${postId}/edit`, {
      state: data,
    });
  };

  if (isLoading) {
    return (
      <>
        <BackAppBar notFixed />
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
        <BackAppBar notFixed />
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
    <section className={styles.container}>
      <div className={styles.top}>
        <BackAppBar backgroundColor={'#eaf5fd'} />
        <div className={styles.displayBox}>
          <div className={styles.displayBoxLeft}>
            <img className={styles.cloudLogoIcon} src={cloudLogo} alt='로고' />
            <span>{userDisplay}</span>
            <span className={styles.dot}></span>
            <span>{dateFormat(createdAt)}</span>
            {isEdited && <span>&nbsp;(수정됨)</span>}
            {isConfirmed && <Icon id='check-circle' width={15} height={15} />}
          </div>
          <Icon
            className={styles.more}
            onClick={() =>
              isWriter
                ? setModal({ id: 'my-exam-review-more-options' })
                : setModal({ id: 'exam-review-more-options' })
            }
            id='ellipsis-vertical'
            width={3}
            height={11}
          />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <ReviewContentItem tag='강의명' value={lectureName} />
          <ReviewContentItem tag='교수' value={professor} />
          <ReviewContentItem tag='강의 종류' value={COURSE_TYPE[lectureType]} />
          <ReviewContentItem
            tag='수강 학기'
            value={`${String(lectureYear % 100).padStart(2, '0')}-${SEMESTER[semester]}`}
          />
          <ReviewContentItem tag='시험 종류' value={EXAM_TYPE[examType]} />
          <ReviewContentItem tag='P/F' value={isPF ? 'O' : 'X'} />
          <ReviewContentItem tag='온라인 수업' value={isOnline ? 'O' : 'X'} />
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
              width={15}
              height={14}
            />
            <span>{commentCount.toLocaleString()}</span>
          </div>
          <div
            className={styles.action}
            onClick={() => (isScrapped ? unscrap.mutate() : scrap.mutate())}
          >
            <Icon
              id='bookmark-fill'
              width={10}
              height={13}
              fill={isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <span>{scrapCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <CommentListSuspense commentCount={commentCount} />
      <CommentInput />
      {/* 시험후기 관련 모달 렌더링 */}
      <ExamReviewModalRenderer
        modal={modal}
        handleEdit={handleEdit}
        handleReport={handleReport}
        handleDelete={handleDelete}
      />
      {isLoading && <FetchLoadingOverlay />}
    </section>
  );
}
