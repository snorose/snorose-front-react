import TextareaAutosize from 'react-textarea-autosize';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { CloseAppBar } from '../../../components/AppBar';
import { TOAST } from '../../../constants';
import { BOARD_MENUS } from '../../../constants';
import { DropDownMenu } from '../../../components/DropDownMenu';
import { postPost } from '../../../apis/post';
import formattedNowTime from '../../../utils/formattedNowTime';
import styles from './PostWritePage.module.css';
import { useToast } from '@/hooks';

export default function PostWritePage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [isNotice, setIsNotice] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [boardTitle, setBoardTitle] = useState('');
  const [boardId, setBoardId] = useState('');

  // 더미 역할 ID
  const roleId = 4;

  // 현재 경로에서 textId 추출
  const textId = pathname.split('/')[2];

  // 게시판 제목 목록에서 '베숙트' 제외
  const boardTitles = BOARD_MENUS.filter((menu) => menu.title !== '베숙트').map(
    (menu) => menu.title
  );

  // 현재 경로의 textId를 바탕으로 게시판 제목과 ID를 설정
  useEffect(() => {
    const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
    if (currentBoard) {
      setBoardTitle(currentBoard.title);
      setBoardId(currentBoard.id);
    } else {
      setBoardTitle('게시판을 선택해주세요');
      setBoardId('');
    }
  }, [textId]);

  // data 객체 상태 설정
  const [data, setData] = useState({
    category: null,
    boardId: boardId,
    title: title,
    content: text,
    isNotice: isNotice,
  });

  // 데이터 업데이트 핸들러
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      category: null,
      boardId: boardId,
      title: title,
      content: text,
      isNotice: isNotice,
    }));
  }, [boardId, title, text, isNotice]);

  // 게시판 선택 핸들러
  const handleDropDownOpen = () => {
    setDropDownOpen((prev) => !prev);
  };

  // 게시판 제목 선택 핸들러
  const handleBoardTitleChange = (selectedTitle) => {
    const selectedBoard = BOARD_MENUS.find(
      (menu) => menu.title === selectedTitle
    );
    if (selectedBoard) {
      setBoardTitle(selectedBoard.title);
      setBoardId(selectedBoard.id);
    }
    setDropDownOpen(false);
  };

  // 공지 여부 선택 핸들러
  const handleIsNotice = () => {
    setIsNotice((prev) => !prev);
  };

  // 게시글 등록 유효성 검사 및 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast(TOAST.emptyTitle);
      return;
    }
    if (!text.trim()) {
      toast(TOAST.emptyText);
      return;
    }
    console.log(data);
    postPost(data);

    navigate(-1); // 제출 후 이동할 경로 설정
  };

  // 제목 40자 제한
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 40) {
      setTitle(newValue);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <CloseAppBar children='등록' stroke='#000' onClick={handleSubmit} />
      </div>
      <div className={styles.center}>
        <div className={styles.categorySelect} onClick={handleDropDownOpen}>
          <div>
            <Icon id='clip-board-list' width='18' height='19' />
            <p className={styles.categorySelectText}>{boardTitle}</p>
          </div>
          <Icon id='angle-down' width='14' height='7' />
        </div>
        <DropDownMenu
          options={boardTitles}
          item={boardTitle}
          setItem={handleBoardTitleChange} // 수정된 핸들러
          dropDownOpen={dropDownOpen}
          setDropDownOpen={setDropDownOpen}
          backgroundColor={'#fff'}
        />
        <div className={styles.profileBox}>
          <div className={styles.profileBoxLeft}>
            <Icon id='cloud' width='25' height='16' />
            <p>김준희</p>
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
      <div
        className={styles.bottom}
        onClick={() => {
          setDropDownOpen(false);
        }}
      ></div>
    </div>
  );
}
