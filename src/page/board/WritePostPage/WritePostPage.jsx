import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import {
  ActionButton,
  Badge,
  CloseAppBar,
  FetchLoading,
  Icon,
  NewConfirmModal,
} from '@/shared/component';
import { BOARD_MENUS, QUERY_KEY, ROLE, TOAST } from '@/shared/constant';
import { useAuth, useBlockerNew, useToast } from '@/shared/hook';
import { formattedNowTime, getBoard } from '@/shared/lib';

import { postPost } from '@/apis';
import { DropDownMenu } from '@/feature/board/component';

import styles from './WritePostPage.module.css';
import { CONFIRM_MODAL_TEXT } from '@/shared/constant/confirmModal';
import { ModalContext } from '@/shared/context/ModalContext';

export default function WritePostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { userInfo, status } = useAuth();
  const { invalidUserInfoQuery } = useAuth();
  const { setModal } = useContext(ModalContext);

  const [isNotice, setIsNotice] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isBlock, setIsBlock] = useState(false);

  const textId = pathname.split('/')[2];
  const currentBoard = getBoard(textId);
  const [boardTitle, setBoardTitle] = useState(
    currentBoard?.title ?? '게시판을 선택해주세요'
  );
  const [boardId, setBoardId] = useState(currentBoard?.id ?? '');

  const pass = boardId && title.trim() && text.trim();

  const boardTitles = BOARD_MENUS.filter((menu) =>
    [21, 22, 23].includes(menu.id)
  ).map((menu) => menu.title);

  // 공식 계정 일반글
  const officialTitles = BOARD_MENUS.filter((menu) =>
    [21, 60, 61, 62].includes(menu.id)
  ).map((menu) => menu.title);

  // 공식 게시판 공지 (ROLE.official)
  const officialNoticeTitles = BOARD_MENUS.filter((menu) =>
    [60, 61, 62].includes(menu.id)
  ).map((menu) => menu.title);

  // 페이지 이탈 방지 모달 노출
  useEffect(() => {
    if (title.trim().length > 0 || text.trim().length > 0) {
      setIsBlock(true);
    } else {
      setIsBlock(false);
    }
  }, [title, text]);

  useBlockerNew(isBlock);

  // 드롭다운 표시
  const displayedTitles = useMemo(() => {
    const roleTitleMap = {
      5: isNotice ? officialNoticeTitles : officialTitles,
      4: [...boardTitles, ...officialNoticeTitles],
    };
    return roleTitleMap[userInfo?.userRoleId] || boardTitles;
  }, [isNotice, userInfo?.userRoleId]);

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

  // 게시글 작성 중 페이지 이탈
  const handleExitPage = () => {
    setModal({
      id: null,
      type: null,
    });
    setIsBlock(false);
    navigate(-1);
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
          <CloseAppBar backgroundColor={'#eaf5fd'}>
            <ActionButton onClick={handleSubmit} disabled={!pass}>
              등록
            </ActionButton>
          </CloseAppBar>
        </div>
        <div className={styles.center}>
          {textId === 'notice' ? (
            <div className={styles.categorySelect}>
              <div className={styles.categorySelectContainer}>
                <Icon
                  id='clip-board-list'
                  width={21}
                  height={22}
                  fill='white'
                />
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
                  <Icon
                    id='clip-board-list'
                    width={21}
                    height={22}
                    fill='white'
                  />
                  <p className={styles.categorySelectText}>{boardTitle}</p>
                </div>
                <Icon id='angle-down' width={14} height={7} />
              </div>
              <DropDownMenu
                options={displayedTitles}
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
              {userInfo?.userRoleId !== ROLE.admin &&
              userInfo?.userRoleId !== ROLE.official ? (
                <Icon id='cloud' width={25} height={16} />
              ) : (
                <Badge
                  userRoleId={userInfo?.userRoleId}
                  className={styles.badge}
                />
              )}
              <p>{userInfo?.nickname}</p>
              <p className={styles.dot}></p>
              <p>{formattedNowTime()}</p>
            </div>
            {textId !== 'notice' && (
              <div
                className={
                  userInfo?.userRoleId === ROLE.admin ||
                  userInfo?.userRoleId === ROLE.official
                    ? styles.profileBoxRight
                    : styles.profileBoxRightInvisible
                }
                onClick={handleIsNotice}
              >
                <Icon
                  id={isNotice ? 'check-circle-blue' : 'check-circle-grey'}
                  width={21}
                  height={22}
                />
                <p>공지글</p>
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
        <NewConfirmModal
          modalText={CONFIRM_MODAL_TEXT.EXIT_PAGE}
          onClickHandler={handleExitPage}
        />
      </div>
    </>
  );
}
