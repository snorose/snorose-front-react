import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import { AttachmentBar } from '@/feature/board/component';
import {
  BackAppBar,
  Badge,
  CloseAppBar,
  ConfirmModal,
  DeleteModal,
  FetchLoading,
  Icon,
} from '@/shared/component';
import {
  BOARD_MENUS,
  MUTATION_KEY,
  QUERY_KEY,
  ROLE,
  TOAST,
} from '@/shared/constant';
import { useAuth, useBlocker, useModal, useToast } from '@/shared/hook';
import { formattedNowTime } from '@/shared/lib';

import { getPostContent, patchPost } from '@/apis';

import styles from './EditPostPage.module.css';

export default function EditPostPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { userInfo, status } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const textId = pathname.split('/')[2];
  const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
  const boardTitle = currentBoard?.title || '';

  const [isNotice, setIsNotice] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [userDisplay, setUserDisplay] = useState('');
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  //'게시글 상세 조회' API에서 제공하는 기존 첨부파일 정보
  const [attachmentsInfo, setAttachmentsInfo] = useState([]);
  const [deleteAttachments, setDeleteAttachments] = useState([]);
  const [isTrashOverlapped, setIsTrashOverlapped] = useState(false);
  const [trashImageIndex, setTrashImageIndex] = useState(null);
  const trashImageConfirmModal = useModal();
  const [isBlock, setIsBlock] = useState(false);

  // navigation guard
  useBlocker(isBlock);

  // 게시글 내용 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    enabled: !!currentBoard?.id && !!postId,
    placeholderData: {},
  });

  // 데이터 화면 표시
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    setTitle(data.title);
    setText(data.content);
    setIsNotice(data.isNotice);
    setUserDisplay(data.userDisplay);
    setAttachmentsInfo(data.attachments);
  }, [data]);

  // isBlock 업데이트
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    setIsBlock(
      data.title !== title.trim() ||
        data.content !== text.trim() ||
        data.isNotice !== isNotice
    );
  }, [title, text, isNotice]);

  // 게시글 수정
  const mutation = useMutation({
    mutationKey: [MUTATION_KEY.editPost],
    mutationFn: patchPost,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.post, postId]);
      navigate(-1);
      toast(TOAST.POST.edit);
      setSubmitDisabled(false);
    },
    onError: ({ response }) => {
      toast(response.data.message);
      setSubmitDisabled(false);
    },
  });

  // 공지 여부 선택 핸들러
  const handleIsNotice = () => {
    setIsNotice((prev) => !prev);
  };

  // 제목 127자 제한
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 127) {
      setTitle(newValue);
    }
  };

  // 게시글 수정 유효성 검사 및 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitDisabled) return;

    if (!title.trim()) {
      toast(TOAST.POST.emptyTitle);
      return;
    }
    if (!text.trim()) {
      toast(TOAST.POST.emptyContent);
      return;
    }

    setSubmitDisabled(true);
    setIsBlock(false);

    mutation.mutate({
      boardId: currentBoard?.id,
      postId,
      title,
      content: text,
      isNotice,
      attachmentsInfo,
      deleteAttachments,
    });
  };

  if (status === 'loading' || isLoading) {
    return (
      <>
        <BackAppBar notFixed />
        <FetchLoading>로딩 중...</FetchLoading>
      </>
    );
  }

  if (error) {
    return (
      <>
        <BackAppBar animation={false} notFixed />
        <FetchLoading>게시글 정보를 불러오지 못했습니다</FetchLoading>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.top}>
            <CloseAppBar
              children={<p onClick={handleSubmit}>수정</p>}
              backgroundColor={'#eaf5fd'}
            />
          </div>
          <div className={styles.center}>
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
                <p>{userDisplay}</p>
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
              <ul className={styles.imageList}>
                {attachmentsInfo.map((att, index) => (
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
                        src={att.url || URL.createObjectURL(att.file)}
                        className={styles.image}
                      />
                    ) : (
                      <div className={styles.image}>
                        <video
                          src={att.url}
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
            setDeleteAttachments((prev) => [
              ...prev,
              attachmentsInfo[draggedIndex].id,
            ]);
            setTrashImageIndex(draggedIndex);
            trashImageConfirmModal.openModal();
          }}
        />
        <AttachmentBar setAttachmentsInfo={setAttachmentsInfo} />
      </div>

      <DeleteModal
        id='post-edit-exit-check'
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
