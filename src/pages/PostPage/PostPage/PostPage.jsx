import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { Comment } from '../../../components/Comment';
import { InputBar } from '../../../components/InputBar';
import { BackAppBar } from '../../../components/AppBar';
import { FetchLoading } from '../../../components/Loading';
import { DeleteModal, OptionModal } from '../../../components/Modal';
import { getPostContent } from '../../../apis/postContent.js';
import { getCommentList, deleteComment } from '../../../apis/comment.js';
import { BOARD_MENUS } from '../../../constants/boardMenus.js';
import styles from './PostPage.module.css';
import timeAgo from '../../../utils/timeAgo.js';

export default function PostPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};

  const [postData, setPostData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [commentParentId, setCommentParentId] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setCommentData(data);
    } catch (error) {
      console.error('댓글 데이터를 불러오지 못했습니다.', error);
    }
  };

  // postId가 변경될 때마다 댓글 목록을 다시 불러옴
  useEffect(() => {
    fetchCommentList();
  }, [postId]);

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

  // 게시글의 댓글 아이콘 클릭 시 댓글 입력창으로 포커스
  const handleCommentClick = (parentId) => {
    setCommentParentId(parentId);
    if (inputBarRef.current) {
      inputBarRef.current.focusInput();
    }
  };

  // 댓글 아이콘 클릭 시 댓글 입력창으로 포커스
  const handleCommentIconClick = () => {
    setCommentParentId(null);
    if (inputBarRef.current) {
      inputBarRef.current.focusInput();
    }
  };

  // 더보기 아이콘 클릭 시: 댓글 ID & 댓글 내용 저장
  const handleCommentOptionClick = (commentId, commentContent) => {
    setSelectedCommentId(commentId);
    setInputValue(commentContent);
    setIsModalOpen(true);
  };

  // 수정 메뉴 클릭 시
  const handleEditMenuClick = () => {
    setIsModalOpen(false);
    inputBarRef.current.focusInput();
  };

  // 삭제 메뉴 클릭 시
  const handleDeleteMenuClick = () => {
    setIsModalOpen(false);
    setIsSecondaryModalOpen(true);
  };

  // 편집 상태 초기화
  const resetEditingState = () => {
    setSelectedCommentId(null);
    setInputValue('');
  };

  if (!postData) {
    return <FetchLoading>게시글을 불러오는 중...</FetchLoading>;
  }

  if (!commentData) {
    return <FetchLoading>댓글을 불러오는 중...</FetchLoading>;
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
            <p>{postData.userDisplay}</p>
            <p className={styles.dot}>·</p>
            <p>
              {timeAgo(postData.createdAt)}
              {postData.edited ? ' (수정됨)' : null}
            </p>
          </div>
          <div className={styles.dot3}>
            <Icon id='ellipsis-vertical' width='3' height='11' />
          </div>
        </div>
        <div className={styles.title}>
          <p>{postData.title}</p>
          <p>{postData.viewCount} views</p>
        </div>
        <p className={styles.text}>{postData.content}</p>
        <div className={styles.post_bottom}>
          <div className={styles.count} onClick={handleCommentIconClick}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{commentData.length}</p>
          </div>
          <div className={styles.count}>
            <Icon id='like' width='13' height='12' fill='#D9D9D9' />
            <p>{postData.likeCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.comments}>
        <p className={styles.commentsTitle}>댓글 {commentData.length}개</p>
        {commentData.map((comment) => (
          <Comment
            key={comment.id}
            data={comment}
            onCommentClick={() => handleCommentClick(comment.id)}
            onCommentOptionClick={handleCommentOptionClick}
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
        id='comment-edit'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        functions={{
          pencil: handleEditMenuClick,
          trash: handleDeleteMenuClick,
        }}
      />
      <DeleteModal
        id='comment-delete'
        isOpen={isSecondaryModalOpen}
        setIsOpen={setIsSecondaryModalOpen}
        redBtnFuction={handleDelete}
      />
    </div>
  );
}
