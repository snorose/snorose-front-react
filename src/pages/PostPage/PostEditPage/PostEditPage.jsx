import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TextareaAutosize from 'react-textarea-autosize';

import { getPostContent, patchPost } from '@/apis/post';

import { useToast } from '@/hooks';

import { CloseAppBar } from '@/components/AppBar';
import { Icon } from '@/components/Icon';

import { formattedNowTime } from '@/utils';

import { BOARD_MENUS, TOAST } from '@/constants';

import styles from './PostEditPage.module.css';

const roleId = 4; // 더미 역할 ID

export default function PostEditPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
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

  // 게시글 내용 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['postContent', postId],
    queryFn: () => getPostContent(currentBoard?.id, postId),
    enabled: !!currentBoard?.id && !!postId,
  });

  // 데이터 화면 표시
  useEffect(() => {
    if (data) {
      console.log('Data updated:', data);
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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>Error loading post content</div>;
  }

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
          {textId !== 'notice' && (
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
  );
}
