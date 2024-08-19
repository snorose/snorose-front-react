import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { Comment } from '../../../components/Comment';
import { InputBar } from '../../../components/InputBar';
import { BackAppBar } from '../../../components/AppBar';
import { FetchLoading } from '../../../components/Loading';
import { DeleteModal, OptionModal } from '../../../components/Modal';
import { getPostContent } from '../../../apis/post.js';
import { getCommentList, deleteComment } from '../../../apis/comment.js';
import { BOARD_MENUS } from '../../../constants/boardMenus.js';
import styles from './PostPage.module.css';
import timeAgo from '../../../utils/timeAgo.js';

export default function PostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};

  const [postData, setPostData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [commentParentId, setCommentParentId] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [modalType, setModalType] = useState('');
  const [isPrimaryModalOpen, setIsPrimaryModalOpen] = useState(false);
  const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputBarRef = useRef(null);

  // 게시글 데이터 받아오기
  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const data = await getPostContent(currentBoard.id, postId);
        setPostData(data);
      } catch (error) {
        console.error('게시글 데이터를 불러오지 못했습니다.', error);
        setPostData({}); // 기본값 설정
      }
    };

    if (currentBoard.id && postId) {
      fetchPostContent();
    }
  }, [currentBoard.id, postId]);

  // 댓글 데이터 받아오기
  const fetchCommentList = async () => {
    try {
      const data = await getCommentList(postId);
      setCommentData(Array.isArray(data) ? filterDeletedComments(data) : []);
    } catch (error) {
      console.error('댓글 데이터를 불러오지 못했습니다.', error);
      setCommentData([]); // 기본값 설정
    }
  };

  // 댓글 삭제하기
  const fetchCommentDelete = async () => {
    try {
      await deleteComment(postId, selectedCommentId);
      await fetchCommentList(); // 삭제 후 댓글 목록 다시 가져오기
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다.', error);
    }
  };

  const handleDelete = async () => {
    await fetchCommentDelete();
    setIsSecondaryModalOpen(false);
  };

  // 삭제된 댓글과 대댓글을 재귀적으로 필터링
  const filterDeletedComments = (comments) => {
    return comments
      .map((comment) => {
        const filteredChildren = filterDeletedComments(comment.children);
        if (comment.isDeleted) {
          if (filteredChildren.length > 0) {
            return {
              ...comment,
              children: filteredChildren,
            };
          }
          return null;
        }
        return {
          ...comment,
          children: filteredChildren,
        };
      })
      .filter(Boolean);
  };

  useEffect(() => {
    fetchCommentList();
  }, [postId]);

  // 댓글 아이콘 클릭 및 댓글 클릭 시 포커스 및 댓글 ID 설정
  const handleCommentInteraction = (parentId = null) => {
    setCommentParentId(parentId);
    if (inputBarRef.current) {
      inputBarRef.current.focusInput();
    }
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
      navigate(`/post/edit`);
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

  if (!postData || Object.keys(postData).length === 0) {
    return <FetchLoading>게시글을 불러오는 중...</FetchLoading>;
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
              {postData.edited ? ' (수정됨)' : null}
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
          <p>{postData.title}</p>
          <p>{postData.viewCount} views</p>
        </div>
        <p className={styles.text}>{postData.content}</p>
        <div className={styles.post_bottom}>
          <div
            className={styles.count}
            onClick={() => handleCommentInteraction()}
          >
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{postData.commentCount}</p>
          </div>
          <div className={styles.count}>
            <Icon id='like' width='13' height='12' fill='#D9D9D9' />
            <p>{postData.likeCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.comments}>
        <p className={styles.commentsTitle}>댓글 {postData.commentCount}개</p>
        {commentData.map((comment) => (
          <Comment
            key={comment.id}
            data={comment}
            onCommentClick={() => handleCommentInteraction(comment.id)}
            onCommentOptionClick={handleOptionClick}
          />
        ))}
      </div>
      <InputBar
        postId={postId}
        parentId={commentParentId}
        onCommentSubmit={fetchCommentList}
        inputValue={inputValue}
        isEditing={!!selectedCommentId}
        selectedCommentId={selectedCommentId}
        resetEditingState={resetEditingState}
        ref={inputBarRef}
      />
      <OptionModal
        id={modalType === 'post' ? 'post-edit' : 'comment-edit'}
        isOpen={isPrimaryModalOpen}
        setIsOpen={setIsPrimaryModalOpen}
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
    </div>
  );
}
