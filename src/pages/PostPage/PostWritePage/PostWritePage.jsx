import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import { postPost } from '@/apis';

import { useToast, useAuth } from '@/hooks';

import {
  Icon,
  CloseAppBar,
  DropDownMenu,
  DeleteModal,
  FetchLoading,
} from '@/components';

import { formattedNowTime } from '@/utils';

import { BOARD_MENUS, ROLE, TOAST } from '@/constants';

import styles from './PostWritePage.module.css';

export default function PostWritePage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { userInfo, status } = useAuth();
  const [isNotice, setIsNotice] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (boardId === '') {
      toast(TOAST.POST.emptyBoard);
      return;
    }
    if (!title.trim()) {
      toast(TOAST.POST.emptyTitle);
      return;
    }
    if (!text.trim()) {
      toast(TOAST.POST.emptyContent);
      return;
    }

    // 게시글 등록
    postPost(data)
      .then((response) => {
        if (response.status === 201) {
          toast(TOAST.POST.create);
          const newPostId = response.data.result.postId;
          currentBoard.id === 12 || isNotice
            ? navigate(`/board/${currentBoard.textId}/notice`)
            : navigate(`/board/${currentBoard.textId}/post/${newPostId}`);
        }
      })
      .catch(({ response }) => {
        toast(response.data.message);
      });
  };

  // 제목 40자 제한
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 40) {
      setTitle(newValue);
    }
  };

  if (status === 'loading') {
    return (
      <>
        <FetchLoading>로딩 중...</FetchLoading>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <CloseAppBar
            children='등록'
            stroke='#000'
            onClick={handleSubmit}
            xClick={() => {
              title.trim() || text.trim()
                ? setIsCheckModalOpen(true)
                : navigate(-1);
            }}
          />
        </div>
        <div className={styles.center}>
          {textId === 'notice' ? (
            <div className={styles.categorySelect}>
              <div>
                <Icon id='clip-board-list' width='18' height='19' />
                <p className={styles.categorySelectText}>{boardTitle}</p>
              </div>
            </div>
          ) : (
            <>
              <div
                className={styles.categorySelect}
                onClick={handleDropDownOpen}
              >
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
            </>
          )}

          <div className={styles.profileBox}>
            <div className={styles.profileBoxLeft}>
              <Icon id='cloud' width='25' height='16' />
              <p>{userInfo.nickname}</p>
              <p className={styles.dot}></p>
              <p>{formattedNowTime()}</p>
            </div>
            {textId !== 'notice' && (
              <div
                className={
                  userInfo.userRoleId === ROLE.admin
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
            )}
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
      <DeleteModal
        id='post-write-exit-check'
        isOpen={isCheckModalOpen}
        closeFunction={() => setIsCheckModalOpen(false)}
        redBtnFunction={() => navigate(-1)}
      />
    </>
  );
}
