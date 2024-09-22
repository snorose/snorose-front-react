import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TextareaAutosize from 'react-textarea-autosize';

import { getPostContent, patchPost } from '@/apis/post';

import { useToast, useAuth } from '@/hooks';

import {
  FetchLoading,
  BackAppBar,
  CloseAppBar,
  Icon,
  DeleteModal,
} from '@/components';

import { formattedNowTime } from '@/utils';

import { BOARD_MENUS, TOAST, ROLE } from '@/constants';

import styles from './PostEditPage.module.css';

export default function PostEditPage() {
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

  // 게시글 내용 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['postContent', postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    enabled: !!currentBoard?.id && !!postId,
  });

  // 데이터 화면 표시
  useEffect(() => {
    if (data) {
      // console.log('Data updated:', data);
      setTitle(data.title);
      setText(data.content);
      setIsNotice(data.isNotice);
      setUserDisplay(data.userDisplay);
    }
  }, [data]);

  // 게시글 수정
  const mutation = useMutation({
    mutationFn: (updatedPost) => patchPost(updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries(['postContent', postId]);
      navigate(-1);
      toast(TOAST.POST.edit);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast(TOAST.POST.emptyTitle);
      return;
    }
    if (!text.trim()) {
      toast(TOAST.POST.emptyContent);
      return;
    }
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
        <BackAppBar notFixed/>
        <FetchLoading>로딩 중...</FetchLoading>
      </>
    );
  }

  if (error) {
    return (
      <>
        <BackAppBar animation={false} notFixed/>
        <FetchLoading>게시글 정보를 불러오지 못했습니다</FetchLoading>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <CloseAppBar
            children='수정'
            stroke='#000'
            onClick={handleSubmit}
            backgroundColor={'#eaf5fd'}
            xClick={() => {
              data.title !== title ||
              data.content !== text ||
              data.isNotice !== isNotice
                ? setIsCheckModalOpen(true)
                : navigate(-1);
            }}
          />
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
        id='post-edit-exit-check'
        isOpen={isCheckModalOpen}
        closeFunction={() => setIsCheckModalOpen(false)}
        redBtnFunction={() => navigate(-1)}
      />
    </>
  );
}
