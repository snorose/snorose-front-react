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
  ActionButton,
} from '@/components';

import { formattedNowTime, getBoard } from '@/utils';

import { BOARD_MENUS, ROLE, TOAST, QUERY_KEY } from '@/constants';

import styles from './PostWritePage.module.css';
import { useQueryClient } from '@tanstack/react-query';

export default function PostWritePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { userInfo, status } = useAuth();
  const [isNotice, setIsNotice] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const textId = pathname.split('/')[2];
  const currentBoard = getBoard(textId);
  const [boardTitle, setBoardTitle] = useState(
    currentBoard?.title ?? '게시판을 선택해주세요'
  );
  const [boardId, setBoardId] = useState(currentBoard?.id ?? '');

  const { invalidUserInfoQuery } = useAuth();

  const pass = boardId && title.trim() && text.trim();

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
    isNotice: textId === 'notice' ? true : isNotice,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitDisabled) return;

    setSubmitDisabled(true);

    // 게시글 등록
    postPost(data)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data.result.pointDifference);
          !response.data.result.pointDifference
            ? toast(TOAST.POST.createNoPoints)
            : toast(TOAST.POST.create);
          const newPostId = response.data.result.postId;

          queryClient.removeQueries([QUERY_KEY.post]);
          invalidUserInfoQuery();
          currentBoard.id === 12 || isNotice
            ? navigate(`/board/${currentBoard.textId}/notice`, {
                replace: true,
              })
            : navigate(
                `/board/${BOARD_MENUS.find((menu) => menu.id === boardId).textId}/post/${newPostId}`,
                { replace: true }
              );
        }
      })
      .catch(({ response }) => {
        toast(response.data.message);
      })
      .finally(() => {
        setSubmitDisabled(false);
      });
  };

  // 제목 127자 제한
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 127) {
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
            backgroundColor={'#eaf5fd'}
            onClose={() => {
              title.trim() || text.trim()
                ? setIsCheckModalOpen(true)
                : navigate(-1, { replace: true });
            }}
          >
            <ActionButton onClick={handleSubmit} disabled={!pass}>
              등록
            </ActionButton>
          </CloseAppBar>
        </div>
        <div className={styles.center}>
          {textId === 'notice' ? (
            <div className={styles.categorySelect}>
              <div className={styles.categorySelectContainer}>
                <Icon id='clip-board-list' width={18} height={19} />
                <p className={styles.categorySelectText}>{boardTitle}</p>
              </div>
            </div>
          ) : (
            <>
              <div
                className={styles.categorySelect}
                onClick={handleDropDownOpen}
              >
                <div className={styles.categorySelectContainer}>
                  <Icon id='clip-board-list' width={18} height={19} />
                  <p className={styles.categorySelectText}>{boardTitle}</p>
                </div>
                <Icon id='angle-down' width={14} height={7} />
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
              <Icon id='cloud' width={25} height={16} />
              <p>{userInfo?.nickname}</p>
              <p className={styles.dot}></p>
              <p>{formattedNowTime()}</p>
            </div>
            {textId !== 'notice' && (
              <div
                className={
                  userInfo?.userRoleId === ROLE.admin
                    ? styles.profileBoxRight
                    : styles.profileBoxRightInvisible
                }
                onClick={handleIsNotice}
              >
                <p>공지글</p>
                <Icon
                  id={isNotice ? 'toggle-on' : 'toggle-off'}
                  width={25}
                  height={16}
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
        closeFn={() => setIsCheckModalOpen(false)}
        redBtnFunction={() => navigate(-1, { replace: true })}
      />
    </>
  );
}
