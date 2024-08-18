import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { useCommentContext } from '../../../contexts/CommentContext.jsx';

import useComment from '../../../hooks/useComment.jsx';

import { Icon } from '../../../components/Icon';
import { CommentList } from '../../../components/Comment';
import { InputBar } from '../../../components/InputBar';
import { BackAppBar } from '../../../components/AppBar';
import { FetchLoading } from '../../../components/Loading';

import { getPostContent } from '../../../apis/postContent.js';
import { BOARD_MENUS } from '../../../constants/boardMenus.js';

import timeAgo from '../../../utils/timeAgo.js';

import styles from './PostPage.module.css';
import { filterDeletedComments } from '../../../utils/filterComment.js';

export default function PostPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { inputFocus } = useCommentContext();
  const { commentList } = useComment();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};
  const [postData, setPostData] = useState(null);
  const filterdCommentList = filterDeletedComments(commentList);

  // 게시글 데이터 받아오기
  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const data = await getPostContent(currentBoard.id, postId);
        setPostData(data);
      } catch (error) {
        console.error('게시글 데이터를 불러오지 못했습니다.', error);
      }
    };

    if (currentBoard.id && postId) {
      fetchPostContent();
    }
  }, [currentBoard.id, postId]);

  if (!postData) {
    return <FetchLoading>게시글을 불러오는 중...</FetchLoading>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.backAppBar}>
        <BackAppBar />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.contentTopLeft}>
            <Icon id='cloud' width='25' height='16' />
            <p>{postData.userDisplay}</p>
            <p className={styles.dot}>·</p>
            <p>
              {timeAgo(postData.createdAt)}
              {postData.edited ? ' (수정됨)' : null}
            </p>
          </div>
          <div className={styles.dot3}>
            <Icon id='ellipsis-vertical' width='3' height='11' />
          </div>
        </div>
        <div className={styles.title}>
          <p>{postData.title}</p>
          <p>{postData.viewCount} views</p>
        </div>
        <p className={styles.text}>{postData.content}</p>
        <div className={styles.post_bottom}>
          <div className={styles.count} onClick={inputFocus}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{filterdCommentList?.length}</p>
          </div>
          <div className={styles.count}>
            <Icon id='like' width='13' height='12' fill='#D9D9D9' />
            <p>{postData.likeCount}</p>
          </div>
        </div>
      </div>
      <CommentList postId={postId} />
      <InputBar />
    </div>
  );
}
