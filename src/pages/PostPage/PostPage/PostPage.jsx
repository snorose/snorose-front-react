import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getPostContent, deletePost, reportPost, reportUser } from '@/apis';

import { useCommentContext } from '@/contexts/CommentContext.jsx';

import { useAuth, useLike, useScrap, useToast } from '@/hooks';

import { NotFoundPage } from '@/pages/NotFoundPage';
import { PostContent } from '@/pages/PostPage';

import {
  BackAppBar,
  CommentList,
  DeleteModal,
  OptionModal,
  FetchLoading,
  Icon,
  InputBar,
} from '@/components';

import { getBoard, timeAgo } from '@/utils';
import { LIKE_TYPE, MUTATION_KEY, QUERY_KEY, TOAST } from '@/constants';

import styles from './PostPage.module.css';

export default function PostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const { inputFocus } = useCommentContext();
  const { toast } = useToast();
  const currentBoard = getBoard(pathname.split('/')[2]);
  const isCommunity = [21, 22, 23].includes(currentBoard.id);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPostReportModalOpen, setIsPostReportModalOpen] = useState(false);
  const [isUserReportModalOpen, setIsUserReportModalOpen] = useState(false);
  const [deleteSubmitDisabled, setDeleteSubmitDisabled] = useState(false);
  const { invalidUserInfoQuery } = useAuth();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
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
      const response = await deletePost(currentBoard.id, postId);

      if (response.status === 200) {
        currentBoard.id !== 23
          ? toast(TOAST.POST.delete)
          : toast(TOAST.POST.deleteNoPoints);
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
            <p className={styles.dot}>·</p>
            <p>
              {timeAgo(data.createdAt)}
              {data.isEdited && ' (수정됨)'}
            </p>
          </div>
          <div
            style={{
              display: data.isNotice && !data.isWriter ? 'none' : 'block',
            }}
            className={styles.dot3}
            onClick={() => {
              data.isWriter
                ? setIsOptionsModalOpen(true)
                : setIsReportModalOpen(true);
            }}
          >
            <Icon id='ellipsis-vertical' width={3} height={11} />
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
        <PostContent content={data.content} />
        <div className={styles.post_bottom}>
          <div className={styles.count} onClick={inputFocus}>
            <Icon id='comment' width={15} height={13} fill='#D9D9D9' />
            <p>{data.commentCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() => (data.isLiked ? unlike.mutate() : like.mutate())}
          >
            <Icon
              id='like'
              width={13}
              height={12}
              fill={data.isLiked ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{data.likeCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() =>
              data.isScrapped ? unscrap.mutate() : scrap.mutate()
            }
          >
            <Icon
              id='bookmark-fill'
              width={10}
              height={13}
              fill={data.isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{data.scrapCount.toLocaleString()}</p>
          </div>
        </div>
      </div>
      {(!data.isNotice || !isCommunity) && (
        <>
          <CommentList commentCount={data.commentCount} />
          <InputBar />
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
