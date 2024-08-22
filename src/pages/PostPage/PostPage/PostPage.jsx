import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCommentContext } from '../../../contexts/CommentContext.jsx';
import useComment from '../../../hooks/useComment.jsx';
import { Icon } from '../../../components/Icon';
import { CommentList } from '../../../components/Comment';
import { InputBar } from '../../../components/InputBar';
import { BackAppBar } from '../../../components/AppBar';
import { FetchLoading } from '../../../components/Loading';
import { OptionModal, DeleteModal } from '@/components/Modal/index.js';
import { getPostContent, deletePost } from '../../../apis/post.js';
import timeAgo from '../../../utils/timeAgo.js';
import { filterDeletedComments } from '../../../utils/filterComment.js';
import styles from './PostPage.module.css';
import { BOARD_MENUS } from '../../../constants/boardMenus.js';

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
  const inputBarRef = useRef(null);
  const filterdCommentList = filterDeletedComments(commentList);

  // 게시글 데이터 받아오기
  useEffect(() => {
    const fetchPostContent = async () => {
      // console.log(postId, currentBoard.id);
      try {
        const data = await getPostContent(currentBoard.id, postId);
        setPostData(data);
      } catch (error) {
        console.error('게시글 데이터를 불러오지 못했습니다.', error);
        setPostData({});
      }
    };

    if (currentBoard.id && postId) {
      fetchPostContent();
    }
  }, [currentBoard.id, postId]);

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

  if (!postData) {
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
          <div className={styles.count} onClick={inputFocus}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{filterdCommentList?.length}</p>
          </div>
          <div className={styles.count}>
            <Icon id='like' width='13' height='12' fill='#D9D9D9' />
            <p>{postData.likeCount}</p>
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
