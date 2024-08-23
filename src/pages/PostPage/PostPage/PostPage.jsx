import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPostContent, deletePost } from '@/apis/post.js';
import { postScrap, deleteScrap } from '@/apis/scrap';
import { postLike, deleteLike } from '@/apis/like';

import { useCommentContext } from '@/contexts/CommentContext.jsx';
import useComment from '@/hooks/useComment.jsx';

import { BackAppBar } from '@/components/AppBar';
import { CommentList } from '@/components/Comment';
import { DeleteModal, OptionModal } from '@/components/Modal/index.js';
import { FetchLoading } from '@/components/Loading';
import { Icon } from '@/components/Icon';
import { InputBar } from '@/components/InputBar';

import { filterDeletedComments } from '@/utils/filterComment.js';
import timeAgo from '@/utils/timeAgo.js';

import { BOARD_MENUS } from '@/constants/boardMenus.js';

import styles from './PostPage.module.css';

export default function PostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { inputFocus } = useCommentContext();
  const { commentList } = useComment();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};
  const [postData, setPostData] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [modalType, setModalType] = useState('');
  const [isPrimaryModalOpen, setIsPrimaryModalOpen] = useState(false);
  const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isScraped, setIsScraped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const inputBarRef = useRef(null);
  const filterdCommentList = filterDeletedComments(commentList);

  // 게시글 데이터 받아오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['postContent', postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    enabled: !!currentBoard?.id && !!postId,
  });

  // 스크랩 클릭
  const handleScrap = async () => {
    console.log('scrap icon click');
    // if (postData.isScraped) {
    //   await deleteScrap(postId);
    // } else {
    //   await postScrap(postId);
    // }
    // // setPostData((prevData) => ({
    // //   ...prevData,
    // //   isScraped: !prevData.isScraped,
    // // }));
  };

  // 좋아요 로직
  const handleLike = async (type) => {
    console.log('post-like icon click', type);
    // if (postData.isLiked) {
    //   await deleteLike(postId);
    // } else {
    //   await postLike(postId);
    // }
    // // setPostData((prevData) => ({
    // //   ...prevData,
    // //   isLiked: !prevData.isLiked,
    // // }));
  };

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
    setIsSecondaryModalOpen(false);
  };

  // 더보기 아이콘 클릭 시 모달 type 설정 (post or comment)
  const handleOptionClick = (type, commentId = null, commentContent = '') => {
    setModalType(type);
    if (type === 'comment') {
      setSelectedCommentId(commentId);
      setInputValue(commentContent);
    }
    setIsPrimaryModalOpen(true);
  };

  // 모달에서 수정 옵션 클릭 시
  const handleEditMenuClick = () => {
    if (modalType === 'post') {
      navigate(`./edit`);
    } else if (modalType === 'comment') {
      setIsPrimaryModalOpen(false);
      inputBarRef.current.focusInput();
    }
  };

  // 모달에서 삭제 옵션 클릭 시
  const handleDeleteMenuClick = () => {
    setIsPrimaryModalOpen(false);
    setIsSecondaryModalOpen(true);
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
          <div className={styles.count} onClick={() => handleLike('post')}>
            <Icon id='like' width='13' height='12' fill='#D9D9D9' />
            <p>{postData.likeCount}</p>
          </div>
          <div className={styles.count} onClick={() => handleScrap}>
            <Icon id='bookmark-fill' width='10' height='13' fill='#D9D9D9' />
            <p>{postData.scrapCount}</p>
          </div>
        </div>
      </div>
      <OptionModal
        id={modalType === 'post' ? 'post-edit' : 'comment-edit'}
        isOpen={isPrimaryModalOpen}
        setIsOpen={setIsPrimaryModalOpen}
        closeFn={() => {
          resetEditingState();
          setIsPrimaryModalOpen(false);
        }}
        functions={{
          pencil: handleEditMenuClick,
          trash: handleDeleteMenuClick,
        }}
      />
      <DeleteModal
        id={modalType === 'post' ? 'post-delete' : 'comment-delete'}
        isOpen={isSecondaryModalOpen}
        setIsOpen={setIsSecondaryModalOpen}
        redBtnFunction={handleDelete}
      />
      <CommentList postId={postId} />
      <InputBar />
    </div>
  );
}
