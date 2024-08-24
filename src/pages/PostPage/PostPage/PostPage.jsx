import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPostContent, deletePost } from '@/apis/post.js';

import { useCommentContext } from '@/contexts/CommentContext.jsx';
import { useComment, useLike, useScrap, useToast } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { CommentList } from '@/components/Comment';
import { DeleteModal, OptionModal } from '@/components/Modal/index.js';
import { FetchLoading } from '@/components/Loading';
import { Icon } from '@/components/Icon';
import { InputBar } from '@/components/InputBar';

import { filterDeletedComments } from '@/utils/filterComment.js';
import timeAgo from '@/utils/timeAgo.js';

import { BOARD_MENUS } from '@/constants/boardMenus.js';
import { TOAST } from '@/constants';

import styles from './PostPage.module.css';

export default function PostPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { inputFocus } = useCommentContext();
  const { commentList } = useComment();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};
  const [postData, setPostData] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [modalType, setModalType] = useState('');
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputBarRef = useRef(null);
  const filterdCommentList = filterDeletedComments(commentList);

  // 게시글 데이터 받아오기
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['postContent', postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    enabled: !!currentBoard?.id && !!postId,
  });

  // 스크랩 훅 사용
  const {
    isScrapped,
    toggleScrap,
    error: scrapError,
  } = useScrap(postId, data?.isScrapped, refetch);

  // 스크랩 처리 시 에러 메시지 표시
  useEffect(() => {
    if (scrapError?.response?.status === 403) {
      toast(TOAST.SCRAP_SELF_ERROR);
    }
  }, [scrapError]);

  // 좋아요 훅 사용
  const {
    isLiked,
    toggleLike,
    error: likeError,
  } = useLike('posts', postId, data?.isLiked, refetch);

  // 좋아요 처리 시 에러 메시지 표시
  useEffect(() => {
    if (likeError?.response?.status === 403) {
      toast(TOAST.LIKE_SELF_ERROR);
    }
  }, [likeError]);

  // 데이터 화면 표시
  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);

  // 게시글 삭제하기
  const handleDelete = async () => {
    if (modalType === 'post') {
      await deletePost(currentBoard.id, postId);
      navigate(`/board/${currentBoard.textId}`);
    }
    setIsDeleteModalOpen(false);
  };

  // 더보기 아이콘 클릭 시 모달 type 설정 (post or comment)
  const handleOptionClick = (type, commentId = null, commentContent = '') => {
    setModalType(type);
    if (type === 'comment') {
      setSelectedCommentId(commentId);
      setInputValue(commentContent);
    }
    setIsOptionsModalOpen(true);
  };

  // 모달에서 수정 옵션 클릭 시
  const handleEditMenuClick = () => {
    if (modalType === 'post') {
      navigate(`./edit`);
    } else if (modalType === 'comment') {
      setIsOptionsModalOpen(false);
      inputBarRef.current.focusInput();
    }
  };

  // 모달에서 삭제 옵션 클릭 시
  const handleDeleteMenuClick = () => {
    setIsOptionsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  // 모달에서 신고 옵션 클릭 시
  const handleReportMenuClick = () => {
    setIsOptionsModalOpen(false);
    setIsReportModalOpen(true);
  };

  // 댓글 편집 상태 초기화
  const resetEditingState = () => {
    setSelectedCommentId(null);
    setInputValue('');
  };

  // 로딩과 에러 상태에 따라 조건부 렌더링
  if (isLoading) {
    return <FetchLoading>게시글을 불러오는 중...</FetchLoading>;
  }

  if (error) {
    return <FetchLoading>게시글 불러오기에 실패했습니다.</FetchLoading>;
  }

  if (!postData) {
    return <FetchLoading>게시글을 찾을 수 없습니다.</FetchLoading>;
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
            className={styles.dot3}
            onClick={() => handleOptionClick('post')}
          >
            <Icon id='ellipsis-vertical' width='3' height='11' />
          </div>
        </div>
        <div className={styles.title}>
          <p>
            {postData.title} <span>{postData.viewCount} views</span>
          </p>
        </div>
        <p className={styles.text}>{postData.content}</p>
        <div className={styles.post_bottom}>
          <div className={styles.count} onClick={inputFocus}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{filterdCommentList?.length}</p>
          </div>
          <div className={styles.count} onClick={toggleLike}>
            <Icon
              id='like'
              width='13'
              height='12'
              fill={isLiked ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{postData.likeCount}</p>
          </div>
          <div className={styles.count} onClick={toggleScrap}>
            <Icon
              id='bookmark-fill'
              width='10'
              height='13'
              fill={isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{postData.scrapCount}</p>
          </div>
        </div>
      </div>
      <OptionModal
        id={modalType === 'post' ? 'post-more-options' : 'comment-more-options'}
        isOpen={isOptionsModalOpen}
        setIsOpen={setIsOptionsModalOpen}
        closeFn={() => {
          resetEditingState();
          setIsOptionsModalOpen(false);
        }}
        functions={{
          pencil: handleEditMenuClick,
          trash: handleDeleteMenuClick,
          report: handleReportMenuClick,
        }}
      />
      <DeleteModal
        id={modalType === 'post' ? 'post-delete' : 'comment-delete'}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        redBtnFunction={handleDelete}
      />
      <OptionModal
        id='report'
        isOpen={isReportModalOpen}
        setIsOpen={setIsReportModalOpen}
        closeFn={() => setIsReportModalOpen(false)}
      />
      <CommentList postId={postId} />
      <InputBar />
    </div>
  );
}
