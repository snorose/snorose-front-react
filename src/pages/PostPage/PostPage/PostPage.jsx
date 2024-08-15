import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Icon } from '../../../components/Icon';
import { Comment } from '../../../components/Comment';
import { InputBar } from '../../../components/InputBar';
import { BackAppBar } from '../../../components/AppBar';
import { getPostContent } from '../../../apis/postContent.js';
import { getCommentList } from '../../../apis/comment.js';
import { BOARD_MENUS } from '../../../constants/boardMenus.js';
import styles from './PostPage.module.css';
import timeAgo from '../../../utils/timeAgo.js';

export default function PostPage() {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const currentBoard =
    BOARD_MENUS.find((menu) => menu.textId === pathname.split('/')[2]) || {};
  const [postData, setPostData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // 게시글 데이터 받아오기
  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const data = await getPostContent(currentBoard.id, postId);
        console.log(data);
        setPostData(data);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
    };

    if (currentBoard.id && postId) {
      fetchPostContent();
    }
  }, [currentBoard.id, postId]);

  // 댓글 데이터 받아오기
  useEffect(() => {
    const fetchCommentList = async () => {
      try {
        const data = await getCommentList(postId);
        console.log(data);
        setCommentData(data);
      } catch (error) {
        console.error('댓글 데이터를 불러오지 못했습니다.', error);
      }
    };

    fetchCommentList();
  }, [postId]);

  if (!postData) {
    return <div>불러오는 중...</div>;
  }

  if (!commentData) {
    return <div>댓글을 불러오는 중...</div>;
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
          <div className={styles.count}>
            <Icon
              id='comment'
              width='15'
              height='13'
              fill={postData.liked ? '#5F86BF' : '#D9D9D9'}
            />
            <p>{commentData.length}</p>
          </div>
          <div className={styles.count}>
            <Icon id='like' width='13' height='12' fill='#D9D9D9' />
            <p>{postData.likeCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.comments}>
        <p className={styles.commentsTitle}>댓글 {commentData.length}개</p>
        {commentData.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}
      </div>
      <InputBar />
    </div>
  );
}
