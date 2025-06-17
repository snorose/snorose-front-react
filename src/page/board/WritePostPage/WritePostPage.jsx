import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import TextareaAutosize from 'react-textarea-autosize';

import { useAuth, useToast, useModal } from '@/shared/hook';
import {
  ActionButton,
  CloseAppBar,
  ConfirmModal,
  DeleteModal,
  Icon,
  FetchLoading,
} from '@/shared/component';
import { formattedNowTime, getBoard } from '@/shared/lib';
import { BOARD_MENUS, QUERY_KEY, ROLE, TOAST } from '@/shared/constant';

import { postPost } from '@/apis';
import { AttachmentBar, DropDownMenu } from '@/feature/board/component';

import styles from './WritePostPage.module.css';

export default function WritePostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { userInfo, status } = useAuth();
  const [isNotice, setIsNotice] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  //'게시글 생성' API에서 요구하는 데이터 (중 attachments array)
  const [attachmentsInfo, setAttachmentsInfo] = useState([]);
  //'게시글 첨부파일 저장' API로 넘기는 데이터 -> attachmentsInfo로 합침
  //화면상 보여주기 위해 DataUrl로 전환한 이미지들 -> File로 처리해서 없앰

  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isTrashOverlapped, setIsTrashOverlapped] = useState(false);
  const [trashImageIndex, setTrashImageIndex] = useState(null);
  const trashImageConfirmModal = useModal();

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
    attachmentsInfo: attachmentsInfo,
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
        <div>
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
                  <Icon
                    id='clip-board-list'
                    width={18}
                    height={19}
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
                      width={18}
                      height={19}
                      fill='white'
                    />
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

              <ul className={styles.imageList}>
                {attachmentsInfo.map(({ file, ...info }, index) => (
                  <li
                    key={index}
                    className={styles.imageContainer}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', index);
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const draggedIndex = parseInt(
                        e.dataTransfer.getData('text/plain'),
                        10
                      );
                      const droppedIndex = index;

                      //같은 위치에 드롭했을 때
                      if (draggedIndex === droppedIndex) return;

                      setAttachmentsInfo((prev) => {
                        const copy = [...prev];
                        const [moved] = copy.splice(draggedIndex, 1);
                        copy.splice(droppedIndex, 0, moved);
                        return copy;
                      });
                    }}
                  >
                    {attachmentsInfo[index].type === 'PHOTO' ? (
                      <img
                        src={URL.createObjectURL(file)}
                        className={styles.image}
                      />
                    ) : (
                      <div className={styles.image}>
                        <video
                          src={URL.createObjectURL(file)}
                          playsInline
                          className={styles.video}
                          onClick={(e) => {
                            const video = e.target;
                            if (video.paused) {
                              video.play();
                            } else {
                              video.pause();
                            }
                          }}
                        />
                        <Icon
                          id='video-fill'
                          width={'0.875rem'}
                          height={'0.875rem'}
                          className={styles.videoIcon}
                        />
                      </div>
                    )}
                    <Icon
                      id='image-select-bar'
                      width={'1.875rem'}
                      height={'6rem'}
                      fill='white'
                      className={styles.imageSelectBar}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Icon
          id='trashcan'
          width='6.25rem'
          height='6.25rem'
          className={`${isTrashOverlapped ? styles.trashVisible : styles.trashInvisible}`}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsTrashOverlapped(true);
          }}
          onDragOver={(e) => {
            setIsTrashOverlapped(true);
            e.preventDefault();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsTrashOverlapped(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            const draggedIndex = parseInt(
              e.dataTransfer.getData('text/plain'),
              10
            );
            setTrashImageIndex(draggedIndex);

            trashImageConfirmModal.openModal();
          }}
        />
        <AttachmentBar setAttachmentsInfo={setAttachmentsInfo} />
      </div>

      <DeleteModal
        id='post-write-exit-check'
        isOpen={isCheckModalOpen}
        closeFn={() => setIsCheckModalOpen(false)}
        redBtnFunction={() => navigate(-1, { replace: true })}
      />
      <ConfirmModal
        isBackgroundBlurred={false}
        isOpen={trashImageConfirmModal.isOpen}
        title='삭제하시겠습니까?'
        primaryButtonText='확인'
        secondaryButtonText='취소'
        onPrimaryButtonClick={() => {
          setAttachmentsInfo((prev) =>
            prev
              .slice(0, trashImageIndex)
              .concat(prev.slice(trashImageIndex + 1))
          );
          setIsTrashOverlapped(false);
          trashImageConfirmModal.closeModal();
        }}
        onSecondaryButtonClick={() => {
          trashImageConfirmModal.closeModal();
          setIsTrashOverlapped(false);
        }}
      />
    </>
  );
}
