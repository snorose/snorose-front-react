import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '../../../components/Icon';
import { Comment } from '../../../components/Comment';
import { InputBar } from '../../../components/InputBar';
import { BackAppBar } from '../../../components/AppBar';
import { OptionModal } from '../../../components/Modal';
import { getPostContent } from '../../../apis/postContent.js';
import { getCommentList } from '../../../apis/comment.js';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    fetchCommentList();
  }, [postId]);

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

  // 댓글 등록 후 댓글 목록 다시 불러오기
  const handleCommentSubmit = async () => {
    await fetchCommentList();
  };

  if (!postData) {
    return <div>불러오는 중...</div>;
  }

  if (!commentData) {
    return <div>댓글을 불러오는 중...</div>;
  }

  const handleEdit = () => {
    console.log('댓글 수정');
  };

  const handleDelete = () => {
    console.log('댓글 삭제');
  };

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
            onCommentOptionClick={() => {
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>
      <InputBar
        postId={postId}
        parentId={commentParentId}
        onCommentSubmit={handleCommentSubmit}
        ref={inputBarRef}
      />
      <OptionModal
        id='comment-edit'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        functions={{
          pencil: handleEdit,
          trash: handleDelete,
        }}
      />
    </div>
  );
}
