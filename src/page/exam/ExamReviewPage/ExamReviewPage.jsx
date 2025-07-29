import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import {
  deleteExamReview,
  getReviewDetail,
  reportPost,
  reportUser,
} from '@/apis';

import { useAuth, useToast } from '@/shared/hook';
import {
  BackAppBar,
  DeleteModal,
  FetchLoading,
  FetchLoadingOverlay,
  Icon,
  OptionModal,
} from '@/shared/component';
import { dateFormat } from '@/shared/lib';
import { BOARD_MENUS, QUERY_KEY, MUTATION_KEY, TOAST } from '@/shared/constant';

import { NotFoundPage } from '@/page/etc';

import { CommentInput, CommentListSuspense } from '@/feature/comment/component';
import { ReviewContentItem, ReviewDownload } from '@/feature/exam/component';
import { convertToObject } from '@/feature/exam/lib';
import {
  LECTURE_TYPES,
  SEMESTERS,
  EXAM_TYPES,
  FLEX_ALIGN,
} from '@/feature/exam/constant';
import { useScrap } from '@/feature/scrap/hook';

import styles from './ExamReviewPage.module.css';

const COURSE_TYPE = convertToObject(LECTURE_TYPES);
const SEMESTER = convertToObject(SEMESTERS);
const EXAM_TYPE = convertToObject(EXAM_TYPES);

export default function ExamReviewPage() {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPostReportModalOpen, setIsPostReportModalOpen] = useState(false);
  const [isUserReportModalOpen, setIsUserReportModalOpen] = useState(false);
  const [loading, setLoading] = useState();

  const { pathname } = useLocation();
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { scrap, unscrap } = useScrap();
  const { invalidUserInfoQuery } = useAuth();
  const { toast } = useToast();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getReviewDetail(postId),
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: reportPostMutate } = useMutation({
    mutationKey: [MUTATION_KEY.reportPost],
    mutationFn: (body) => reportPost(currentBoard?.id, postId, body),
    onSuccess: ({ message }) => {
      toast(message);
    },
    onError: () => {
      toast('신고에 실패했습니다.');
    },
  });

  const { mutate: reportUserMutate } = useMutation({
    mutationKey: [MUTATION_KEY.reportUser],
    mutationFn: (body) => reportUser(body),
    onSuccess: ({ message }) => {
      toast(message);
    },
    onError: () => {
      toast('신고에 실패했습니다.');
    },
  });

  const deleteReview = useMutation({
    mutationKey: [MUTATION_KEY.deleteExamReview],
    mutationFn: () => deleteExamReview(postId),
    onSuccess: () => {
      queryClient.removeQueries([QUERY_KEY.post, postId]);
      invalidUserInfoQuery();
      toast({ message: TOAST.EXAM_REVIEW.delete });
      navigate(-1);
    },
    onError: ({ response }) => {
      const { status } = response;

      if (status === 500) {
        toast({ message: TOAST.ERROR.SERVER, type: 'error' });
        return;
      }

      toast(response.data.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleReportOptionModalOptionClick = (event) => {
    const reportCategory = event.currentTarget.dataset.value;

    setIsReportModalOpen(false);

    if (reportCategory === 'post-report') {
      setIsPostReportModalOpen(true);
    } else if (reportCategory === 'user-report') {
      setIsUserReportModalOpen(true);
    }
  };

  const handlePostReportOptionModalOptionClick = (event) => {
    const reportType = event.currentTarget.dataset.value;

    reportPostMutate({
      reportType,
    });
    setIsPostReportModalOpen(false);
  };

  const handleUserReportOptionModalOptionClick = (event) => {
    const reportType = event.currentTarget.dataset.value;

    reportUserMutate({
      // targetUserId,
      reportType,
    });

    setIsUserReportModalOpen(false);
  };

  const edit = () =>
    navigate(`/board/exam-review/${postId}/edit`, {
      state: data,
    });

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
    <main>
      <div className={styles.top}>
        <BackAppBar backgroundColor={'#eaf5fd'} />
        <div className={styles.displayBox}>
          <div className={styles.displayBoxLeft}>
            <Icon
              className={styles.cloudIcon}
              id='cloud'
              width={25}
              height={16}
            />
            <span>{userDisplay}</span>
            <span className={styles.dot}></span>
            <span>{dateFormat(createdAt)}</span>
            {isEdited && <span>&nbsp;(수정됨)</span>}
            {isConfirmed && (
              <Icon
                className={styles.checkCircleIcon}
                id='check-circle'
                width={15}
                height={15}
              />
            )}
          </div>
          <Icon
            className={styles.more}
            onClick={() =>
              isWriter ? setIsOptionModalOpen(true) : setIsReportModalOpen(true)
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
        closeFn={() => setIsDeleteModalOpen(false)}
        redBtnFunction={() => {
          setLoading(true);
          deleteReview.mutate();
        }}
      />
      <OptionModal
        id='report'
        isOpen={isReportModalOpen}
        setIsOpen={setIsReportModalOpen}
        onOptionClick={handleReportOptionModalOptionClick}
        closeFn={() => setIsReportModalOpen(false)}
      />
      <OptionModal
        id='post-report'
        isOpen={isPostReportModalOpen}
        setIsOpen={setIsPostReportModalOpen}
        onOptionClick={handlePostReportOptionModalOptionClick}
        closeFn={() => setIsPostReportModalOpen(false)}
      />
      <OptionModal
        id='user-report'
        isOpen={isUserReportModalOpen}
        setIsOpen={setIsUserReportModalOpen}
        onOptionClick={handleUserReportOptionModalOptionClick}
        closeFn={() => setIsUserReportModalOpen(false)}
      />
      {loading && <FetchLoadingOverlay />}
    </main>
  );
}
