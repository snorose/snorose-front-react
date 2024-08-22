import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getPostContent, patchPost } from '@/apis/post';
import { useToast } from '@/hooks';
import { CloseAppBar } from '@/components/AppBar';
import { Icon } from '@/components/Icon';
import formattedNowTime from '@/utils/formattedNowTime';
import { BOARD_MENUS } from '@/constants';
import { TOAST } from '@/constants';

import styles from './PostEditPage.module.css';

const roleId = 4; // 더미 역할 ID

export default function PostEditPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isNotice, setIsNotice] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const textId = pathname.split('/')[2];
  const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
  const [boardTitle, setBoardTitle] = useState(
    currentBoard?.title ?? '게시판을 선택하세요'
  );
  const [boardId, setBoardId] = useState(currentBoard?.id ?? '');

  // 게시글 데이터 받아오기
  const { data, isLoading, error } = useQuery(
    ['postContent', boardId, postId],
    () => getPostContent(boardId, postId),
    {
      enabled: !!boardId && !!postId,
      onSuccess: (data) => {
        setTitle(data.title);
        setText(data.content);
        setIsNotice(data.isNotice);
      },
      onError: (error) =>
        console.error('게시글 데이터를 불러오지 못했습니다.', error),
    }
  );

  // 게시글 수정
  const mutation = useMutation({
    mutationFn: (updatedPost) => patchPost(updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries(['postContent', boardId, postId]);
      navigate(-1); // 수정 후 이전 페이지로 이동
      toast(TOAST.postEditSuccess);
    },
    onError: () => {
      toast(TOAST.postEditFail);
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
      toast(TOAST.emptyTitle);
      return;
    }
    if (!text.trim()) {
      toast(TOAST.emptyText);
      return;
    }
    mutation.mutate({ boardId, postId, title, content: text, isNotice });
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
            <p>{data?.userDisplay}</p>
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

// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import TextareaAutosize from 'react-textarea-autosize';

// import { getPostContent, patchPost } from '@/apis/post';

// import { useToast } from '@/hooks';

// import { CloseAppBar } from '@/components/AppBar';
// import { Icon } from '@/components/Icon';

// import formattedNowTime from '@/utils/formattedNowTime';

// import { BOARD_MENUS } from '@/constants';
// import { TOAST } from '@/constants';

// import styles from './PostEditPage.module.css';

// const roleId = 4; // 더미 역할 ID

// export default function PostEditPage() {
//   const { postId } = useParams();
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const { toast } = useToast();
//   const [isNotice, setIsNotice] = useState(false);
//   const [title, setTitle] = useState('');
//   const [userDisplay, setUserDisplay] = useState('');
//   const [text, setText] = useState('');
//   const [boardTitle, setBoardTitle] = useState('');
//   const [boardId, setBoardId] = useState('');

//   const textId = pathname.split('/')[2];

//   // 현재 경로의 textId를 바탕으로 게시판 제목과 ID를 설정
//   useEffect(() => {
//     const currentBoard = BOARD_MENUS.find((menu) => menu.textId === textId);
//     if (currentBoard) {
//       setBoardTitle(currentBoard.title);
//       setBoardId(currentBoard.id);
//     }
//   }, [textId]);

//   // 게시글 데이터 받아오기
//   useEffect(() => {
//     const fetchPostContent = async () => {
//       if (boardId && postId) {
//         try {
//           const data = await getPostContent(boardId, postId);
//           setUserDisplay(data.userDisplay);
//           setTitle(data.title);
//           setText(data.content);
//           setIsNotice(data.isNotice);
//         } catch (error) {
//           console.error('게시글 데이터를 불러오지 못했습니다.', error);
//         }
//       }
//     };

//     fetchPostContent();
//   }, [boardId, postId]);

//   // 공지 여부 선택 핸들러
//   const handleIsNotice = () => {
//     setIsNotice((prev) => !prev);
//   };

//   // 제목 40자 제한
//   const handleTitleChange = (e) => {
//     const newValue = e.target.value;
//     if (newValue.length <= 40) {
//       setTitle(newValue);
//     }
//   };

//   // 게시글 수정 유효성 검사 및 제출
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) {
//       toast(TOAST.emptyTitle);
//       return;
//     }
//     if (!text.trim()) {
//       toast(TOAST.emptyText);
//       return;
//     }
//     try {
//       await patchPost({ boardId, postId, title, content: text, isNotice });
//       navigate(-1); // 수정 후 이전 페이지로 이동
//       toast(TOAST.postEditSuccess);
//     } catch (error) {
//       toast(TOAST.postEditFail);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <CloseAppBar children='수정' stroke='#000' onClick={handleSubmit} />
//       </div>
//       <div className={styles.center}>
//         <div className={styles.categorySelect}>
//           <div>
//             <Icon id='clip-board-list' width='18' height='19' />
//             <p className={styles.categorySelectText}>{boardTitle}</p>
//           </div>
//         </div>
//         <div className={styles.profileBox}>
//           <div className={styles.profileBoxLeft}>
//             <Icon id='cloud' width='25' height='16' />
//             <p>{userDisplay}</p>
//             <p className={styles.dot}></p>
//             <p>{formattedNowTime()}</p>
//           </div>
//           <div
//             className={
//               roleId === 4
//                 ? styles.profileBoxRight
//                 : styles.profileBoxRightInvisible
//             }
//             onClick={handleIsNotice}
//           >
//             <p>공지글</p>
//             <Icon
//               id={isNotice ? 'toggle-on' : 'toggle-off'}
//               width='25'
//               height='16'
//             />
//           </div>
//         </div>
//         <div className={styles.content}>
//           <TextareaAutosize
//             className={styles.title}
//             placeholder='제목'
//             value={title}
//             onChange={handleTitleChange}
//           />
//           <TextareaAutosize
//             className={styles.text}
//             placeholder='내용'
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
