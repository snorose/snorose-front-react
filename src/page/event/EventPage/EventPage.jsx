import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { deleteEvent, getEventContent, reportPost, reportUser } from '@/apis';

import {
  BackAppBar,
  Badge,
  DeleteModal,
  FetchLoading,
  Icon,
  OptionModal,
  PrimaryButton,
} from '@/shared/component';
import {
  LIKE_TYPE,
  MUTATION_KEY,
  QUERY_KEY,
  ROLE,
  TOAST,
} from '@/shared/constant';
import { useAuth, useToast } from '@/shared/hook';
import {
  convertHyperlink,
  fullDateTimeFormat,
  getBoard,
  dateFormat,
} from '@/shared/lib';

import { NotFoundPage } from '@/page/etc';

import { CommentInput, CommentListSuspense } from '@/feature/comment/component';
import { useCommentContext } from '@/feature/comment/context';
import { useLike } from '@/feature/like/hook';
import { useScrap } from '@/feature/scrap/hook';

import styles from './EventPage.module.css';
import { GuideModal } from '@/feature/event/component';

export default function EventPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const { inputFocus, isInputFocused } = useCommentContext();
  const { toast } = useToast();
  const currentBoard = getBoard(pathname.split('/')[2]);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPostReportModalOpen, setIsPostReportModalOpen] = useState(false);
  const [isUserReportModalOpen, setIsUserReportModalOpen] = useState(false);
  const [deleteSubmitDisabled, setDeleteSubmitDisabled] = useState(false);
  const { invalidUserInfoQuery } = useAuth();
  const { userInfo } = useAuth();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getEventContent(postId),
    staleTime: 1000 * 60 * 5,
    enabled: !!currentBoard?.id && !!postId,
  });

  const { scrap, unscrap } = useScrap();
  const { like, unlike } = useLike({
    type: LIKE_TYPE.post,
    sourceId: postId,
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

  const handleDelete = async () => {
    if (deleteSubmitDisabled) return;
    setDeleteSubmitDisabled(true);
    try {
      const response = await deleteEvent(postId);

      if (response.status === 200) {
        toast(TOAST.POST.deleteNoPoints);
        navigate(-1);
        queryClient.removeQueries([QUERY_KEY.post, postId]);
        invalidUserInfoQuery();
      }
    } catch ({ response }) {
      toast(response.data.message);
    } finally {
      setDeleteSubmitDisabled(false);
      setIsDeleteModalOpen(false);
    }
  };

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
    if (data === undefined) {
      return;
    }

    const reportType = event.currentTarget.dataset.value;
    const { userId } = data;

    reportUserMutate({
      encryptedTargetUserId: userId,
      reportType,
    });

    setIsUserReportModalOpen(false);
  };

  const [open, setOpen] = useState(false);

  // '신청하기'버튼 누르면 폼으로 이동
  const handleApplyClick = () => {
    const link = new URL(
      data.link.trim().startsWith('http')
        ? data.link.trim()
        : `https://${data.link.trim()}`
    );
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('링크가 존재하지 않습니다.');
    }
  };

  // 뱃지를 보여주는 ROLE
  const showBadge =
    data?.userRoleId === ROLE.official ||
    (data?.userRoleId === ROLE.admin && data?.userDisplay !== '익명송이');

  // 로딩과 에러 상태에 따라 조건부 렌더링
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

  if (!data) {
    return (
      <>
        <BackAppBar notFixed />
        <FetchLoading animation={false}>
          게시글을 찾을 수 없습니다.
        </FetchLoading>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backAppBar}>
        <BackAppBar backgroundColor={'#eaf5fd'} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.contentTopLeft}>
            <Icon id='cloud' width={25} height={16} />
            <p>{data.userDisplay || 'Unknown'}</p>
            {showBadge && (
              <Badge userRoleId={data.userRoleId} className={styles.badge} />
            )}
            <p className={styles.dot}>·</p>
            <p>
              {fullDateTimeFormat(data.createdAt)}
              {data.isEdited && ' (수정됨)'}
            </p>
          </div>
          <div
            style={{
              display: data.isNotice && !data.isWriter ? 'none' : 'block',
            }}
            className={styles.meatBall}
            onClick={() => {
              data.isWriter
                ? setIsOptionsModalOpen(true)
                : setIsReportModalOpen(true);
            }}
          >
            <Icon id='meat-ball' width={18} height={4} stroke='none' />
          </div>
        </div>
        <div className={styles.title}>
          <p>
            {data.title}
            <span className={styles.views}>
              &nbsp;&nbsp;{data.viewCount.toLocaleString()} views
            </span>
          </p>
        </div>

        {['연극/뮤지컬', '영화'].includes(data.category) && (
          <div className={styles.host}>
            <Icon id='movie' width={20} height={20} />
            <p>공연명</p>
            <p className={styles.data}>{data.host}</p>
          </div>
        )}
        {['기타'].includes(data.category) && (
          <div className={styles.host}>
            <Icon id='host' width={20} height={20} />
            <p>주최</p>
            <p className={styles.data}>{data.host}</p>
          </div>
        )}

        {['연극/뮤지컬', '영화'].includes(data.category) && (
          <div className={styles.place}>
            <Icon id='location' width={20} height={20} />
            <p>장소</p>
            <p className={styles.data}>{data.place}</p>
          </div>
        )}

        <div className={styles.drawCount}>
          <Icon id='person' width={20} height={20} />
          <p>추첨 인원</p>
          <p className={styles.data}>{data.drawCount} 명</p>
        </div>

        <div className={styles.applicationDate}>
          <Icon
            id='calendar-stroke'
            width={20}
            height={20}
            fill='none'
            stroke='#484848'
          />
          <p>응모 날짜</p>
          <p className={styles.data}>
            {dateFormat(data.startDate)} ~ {dateFormat(data.endDate)}
          </p>
        </div>

        <div className={styles.announceDate}>
          <Icon
            id='calendar-stroke'
            width={20}
            height={20}
            fill='none'
            stroke='#484848'
          />
          <p>당첨자 발표일</p>
          <p className={styles.data}>{dateFormat(data.announceDate)}</p>
        </div>
        <p
          className={styles.contentText}
          dangerouslySetInnerHTML={convertHyperlink(data.content)}
        ></p>

        <div className={styles.note}>
          <p>
            ※ 공식 문의 창구 (이메일(snorose1906@gmail.com), 카카오톡 1:1 문의)
            이외의 문의는 받고 있지 않습니다. 공식 문의 창구 이외의 문의 글은
            답변 없이 삭제될 수 있음을 알려드립니다.
          </p>
        </div>

        {/* <div className={styles.iamges}></div> */}
        <>
          <PrimaryButton
            className={styles.button}
            onClick={() => setOpen(true)}
          >
            신청하기
          </PrimaryButton>
          {open && (
            <GuideModal
              onConfirm={handleApplyClick}
              onClose={() => setOpen(false)}
            />
          )}
        </>

        <div className={styles.post_bottom}>
          <div
            className={styles.count}
            style={{
              display: data.isNotice ? 'none' : 'flex',
            }}
            onClick={inputFocus}
          >
            <Icon
              id='comment-stroke'
              width={20}
              height={16}
              fill={
                isInputFocused.isFocused === true &&
                isInputFocused.parent === 'post'
                  ? '#5F86BF'
                  : 'none'
              }
            />
            <p>댓글 {data.commentCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() => (data.isLiked ? unlike.mutate() : like.mutate())}
          >
            <Icon
              id='like-stroke'
              width={16}
              height={15}
              stroke='#5F86BF'
              fill={data.isLiked ? '#5F86BF' : 'none'}
            />
            <p>공감 {data.likeCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() =>
              data.isScrapped ? unscrap.mutate() : scrap.mutate()
            }
          >
            <Icon
              id='scrap-stroke'
              width={13}
              height={16}
              stroke='#5F86BF'
              fill={data.isScrapped ? '#5F86BF' : 'none'}
            />
            <p>스크랩 {data.scrapCount.toLocaleString()}</p>
          </div>
        </div>
      </div>
      {data.isNotice ? (
        <div className={styles.whiteBox} />
      ) : (
        <>
          <CommentListSuspense commentCount={data.commentCount} />
          {userInfo.userRoleId === 4 ? <CommentInput /> : ''}
        </>
      )}

      <OptionModal
        id='post-more-options'
        isOpen={isOptionsModalOpen}
        setIsOpen={setIsOptionsModalOpen}
        closeFn={() => {
          setIsOptionsModalOpen(false);
        }}
        functions={{
          pencil: () => navigate(`./edit`),
          trash: () => {
            setIsOptionsModalOpen(false);
            setIsDeleteModalOpen(true);
          },
        }}
      />
      <DeleteModal
        id={currentBoard.id !== 23 ? 'post-delete' : 'post-delete-no-points'}
        isOpen={isDeleteModalOpen}
        closeFn={() => {
          setIsDeleteModalOpen(false);
        }}
        redBtnFunction={handleDelete}
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
    </div>
  );
}
