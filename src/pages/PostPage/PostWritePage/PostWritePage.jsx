import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import { postPost } from '@/apis/post';

import { useToast, useAuth } from '@/hooks';

import { Icon, CloseAppBar, DropDownMenu, FetchLoading } from '@/components';

import { TOAST, BOARD_MENUS } from '@/constants';

import formattedNowTime from '@/utils/formattedNowTime';

import styles from './PostWritePage.module.css';

const roleId = 4; // dummy

export default function PostWritePage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { userInfo, status } = useAuth();
  const [isNotice, setIsNotice] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const textId = pathname.split('/')[2];
  const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
  const [boardTitle, setBoardTitle] = useState(
    currentBoard?.title ?? '게시판을 선택해주세요'
  );
  const [boardId, setBoardId] = useState(currentBoard?.id ?? '');

  const boardTitles = BOARD_MENUS.filter((menu) =>
    [21, 22, 23].includes(menu.id)
  ).map((menu) => menu.title);

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

  const data = {
    category: null,
    boardId,
    title,
    content: text,
    isNotice,
  };

  // 게시글 등록 유효성 검사 및 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (boardId === '') {
      toast(TOAST.EMPTY_BOARDID);
      return;
    }
    if (!title.trim()) {
      toast(TOAST.EMPTY_TITLE);
      return;
    }
    if (!text.trim()) {
      toast(TOAST.EMPTY_TEXT);
      return;
    }
    try {
      console.log(data);
      await postPost(data);
      toast(TOAST.POST_CREATE_SUCCESS);
      navigate(-1);
    } catch (error) {
      toast(TOAST.POST_CREATE_FAIL);
    }
  };

  // 제목 40자 제한
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 40) {
      setTitle(newValue);
    }
  };

  if (status === 'loading') {
    return <FetchLoading>로딩 중...</FetchLoading>;
  }

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
          setItem={handleBoardTitleChange}
          dropDownOpen={dropDownOpen}
          setDropDownOpen={setDropDownOpen}
          backgroundColor={'#fff'}
        />
        <div className={styles.profileBox}>
          <div className={styles.profileBoxLeft}>
            <Icon id='cloud' width='25' height='16' />
            <p>{userInfo.nickname}</p>
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
