import TextareaAutosize from 'react-textarea-autosize';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { CloseAppBar } from '../../../components/AppBar';
import { TOAST } from '../../../constants';
import { BOARD_MENUS } from '../../../constants';
import { getPostContent, patchPost } from '../../../apis/post';
import formattedNowTime from '../../../utils/formattedNowTime';
import styles from './PostEditPage.module.css';
import { useToast } from '@/hooks';

export default function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [isNotice, setIsNotice] = useState(false);
  const [title, setTitle] = useState('');
  const [userDisplay, setUserDisplay] = useState('');
  const [text, setText] = useState('');
  const [boardTitle, setBoardTitle] = useState('');
  const [boardId, setBoardId] = useState('');

  // 더미 역할 ID
  const roleId = 4;

  // 현재 경로에서 textId 추출
  const textId = pathname.split('/')[2];

  // 현재 경로의 textId를 바탕으로 게시판 제목과 ID를 설정
  useEffect(() => {
    const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
    if (currentBoard) {
      setBoardTitle(currentBoard.title);
      setBoardId(currentBoard.id);
    }
  }, [textId]);

  // 게시글 데이터 받아오기
  useEffect(() => {
    const fetchPostContent = async () => {
      if (boardId && postId) {
        try {
          const data = await getPostContent(boardId, postId);
          setUserDisplay(data.userDisplay);
          setTitle(data.title);
          setText(data.content);
          setIsNotice(data.isNotice);
        } catch (error) {
          console.error('게시글 데이터를 불러오지 못했습니다.', error);
        }
      }
    };

    fetchPostContent();
  }, [boardId, postId]);

  // 공지 여부 선택 핸들러
  const handleIsNotice = () => {
    setIsNotice((prev) => !prev);
  };

  // 제목 40자 제한
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 40) {
      setTitle(newValue);
    }
  };

  // 게시글 수정 유효성 검사 및 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast(TOAST.emptyTitle);
      return;
    }
    if (!text.trim()) {
      toast(TOAST.emptyText);
      return;
    }
    try {
      await patchPost({ boardId, postId, title, content: text, isNotice });
      navigate(-1); // 수정 후 이전 페이지로 이동
      toast(TOAST.postEditSuccess);
    } catch (error) {
      toast(TOAST.postEditFail);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <CloseAppBar children='수정' stroke='#000' onClick={handleSubmit} />
      </div>
      <div className={styles.center}>
        <div className={styles.categorySelect}>
          <div>
            <Icon id='clip-board-list' width='18' height='19' />
            <p className={styles.categorySelectText}>{boardTitle}</p>
          </div>
        </div>
        <div className={styles.profileBox}>
          <div className={styles.profileBoxLeft}>
            <Icon id='cloud' width='25' height='16' />
            <p>{userDisplay}</p>
            <p className={styles.dot}></p>
            <p>{formattedNowTime()}</p>
          </div>
          <div
            className={
              roleId === 4
                ? styles.profileBoxRight
                : styles.profileBoxRightInvisible
            }
            onClick={handleIsNotice}
          >
            <p>공지글</p>
            <Icon
              id={isNotice ? 'toggle-on' : 'toggle-off'}
              width='25'
              height='16'
            />
          </div>
        </div>
        <div className={styles.content}>
          <TextareaAutosize
            className={styles.title}
            placeholder='제목'
            value={title}
            onChange={handleTitleChange}
          />
          <TextareaAutosize
            className={styles.text}
            placeholder='내용'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
