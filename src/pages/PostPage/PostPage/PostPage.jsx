import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getPostContent, deletePost, reportPost, reportUser } from '@/apis';

import { useCommentContext } from '@/contexts/CommentContext.jsx';

import { useLike, useScrap, useToast } from '@/hooks';

import { NotFoundPage } from '@/pages/NotFoundPage';

import {
  BackAppBar,
  CommentList,
  DeleteModal,
  OptionModal,
  FetchLoading,
  Icon,
  InputBar,
} from '@/components';

import { timeAgo } from '@/utils';

import { BOARD_MENUS, TOAST } from '@/constants';

import styles from './PostPage.module.css';

export default function PostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { inputFocus } = useCommentContext();
  const { toast } = useToast();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};
  const [postData, setPostData] = useState(null);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPostReportModalOpen, setIsPostReportModalOpen] = useState(false);
  const [isUserReportModalOpen, setIsUserReportModalOpen] = useState(false);

  // 게시글 데이터 받아오기
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['postContent', postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    enabled: !!currentBoard?.id && !!postId,
  });

  const { scrap, deleteScrap } = useScrap();
  const { like, deleteLike } = useLike({ type: 'posts', typeId: postId });

  const { mutate: reportPostMutate } = useMutation({
    mutationKey: 'reportPost',
    mutationFn: (body) => reportPost(currentBoard?.id, postId, body),
    onSuccess: ({ message }) => {
      toast(message);
    },
    onError: () => {
      toast('신고에 실패했습니다.');
    },
  });

  const { mutate: reportUserMutate } = useMutation({
    mutationKey: 'reportUser',
    mutationFn: (body) => reportUser(body),
    onSuccess: ({ message }) => {
      toast(message);
    },
    onError: () => {
      toast('신고에 실패했습니다.');
    },
  });

  // 데이터 화면 표시
  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    try {
      const response = await deletePost(currentBoard.id, postId);

      if (response.status === 200) {
        toast(TOAST.POST.delete);
        navigate(-1);
      }
    } catch ({ response }) {
      toast(response.data.message);
    } finally {
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
    const reportType = event.currentTarget.dataset.value;

    reportUserMutate({
      // targetUserId,
      reportType,
    });

    setIsUserReportModalOpen(false);
  };

  // 로딩과 에러 상태에 따라 조건부 렌더링
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

  if (!postData) {
    return (
      <>
        <BackAppBar />
        <FetchLoading animation={false}>
          게시글을 찾을 수 없습니다.
        </FetchLoading>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backAppBar}>
        <BackAppBar />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.contentTopLeft}>
            <Icon id='cloud' width='25' height='16' />
            <p>{postData.userDisplay || 'Unknown'}</p>
            <p className={styles.dot}>·</p>
            <p>
              {timeAgo(postData.createdAt)}
              {postData.isEdited && ' (수정됨)'}
            </p>
          </div>
          <div
            style={{
              display:
                postData.isNotice && !postData.isWriter ? 'none' : 'block',
            }}
            className={styles.dot3}
            onClick={() => {
              console.log(postData);
              postData.isWriter
                ? setIsOptionsModalOpen(true)
                : setIsReportModalOpen(true);
            }}
          >
            <Icon id='ellipsis-vertical' width='3' height='11' />
          </div>
        </div>
        <div className={styles.title}>
          <p>
            {postData.title}
            <span className={styles.views}>
              &nbsp;&nbsp;{postData.viewCount.toLocaleString()} views
            </span>
          </p>
        </div>
        <p className={styles.text}>{postData.content}</p>
        <div className={styles.post_bottom}>
          <div className={styles.count} onClick={inputFocus}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{postData.commentCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() =>
              postData.isLiked ? deleteLike.mutate() : like.mutate()
            }
          >
            <Icon
              id='like'
              width='13'
              height='12'
              fill={postData.isLiked ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{postData.likeCount.toLocaleString()}</p>
          </div>
          <div
            className={styles.count}
            onClick={() =>
              postData.isScrapped ? deleteScrap.mutate() : scrap.mutate()
            }
          >
            <Icon
              id='bookmark-fill'
              width='10'
              height='13'
              fill={postData.isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{postData.scrapCount}</p>
          </div>
        </div>
      </div>
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
        id='post-delete'
        isOpen={isDeleteModalOpen}
        closeFunction={() => setIsDeleteModalOpen(false)}
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
      <CommentList commentCount={postData.commentCount} />
      <InputBar />
    </div>
  );
}
