import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import {
  BackAppBar,
  Badge,
  CloseAppBar,
  FetchLoading,
  Icon,
  ConfirmModal,
} from '@/shared/component';
import {
  BOARD_MENUS,
  MUTATION_KEY,
  QUERY_KEY,
  ROLE,
  TOAST,
  CONFIRM_MODAL_TEXT,
} from '@/shared/constant';
import { useAuth, useBlocker, useToast } from '@/shared/hook';
import { formattedNowTime } from '@/shared/lib';
import { ModalContext } from '@/shared/context/ModalContext';

import { getPostContent, patchPost } from '@/apis';

import styles from './EditPostPage.module.css';

export default function EditPostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { userInfo, status } = useAuth();
  const { toast } = useToast();
  const { modal, setModal } = useContext(ModalContext);

  const textId = pathname.split('/')[2];
  const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
  const boardTitle = currentBoard?.title || '';

  const [isNotice, setIsNotice] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [userDisplay, setUserDisplay] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isBlock, setIsBlock] = useState(false);

  // 페이지 이탈 방지 모달 노출
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

  // 게시글 수정 중 페이지 이탈
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
        <div className={styles.top}>
          <CloseAppBar
            children={<p onClick={handleSubmit}>수정</p>}
            backgroundColor={'#eaf5fd'}
          />
        </div>
        <div className={styles.center}>
          <div className={styles.categorySelect}>
            <div className={styles.categorySelectContainer}>
              <Icon id='clip-board-list' width={21} height={22} fill='white' />
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
          </div>
        </div>
        {/* 페이지 이탈 방지 모달 */}
        {modal.id === 'exit-page' && (
          <ConfirmModal
            modalText={CONFIRM_MODAL_TEXT.EXIT_PAGE}
            onConfirm={handleExitPage}
          />
        )}
      </div>
    </>
  );
}
