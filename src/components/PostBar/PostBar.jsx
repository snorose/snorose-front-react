import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Icon } from '@/components/Icon';

import timeAgo from '@/utils/timeAgo.js';

import styles from './PostBar.module.css';

export default function PostBar({
  data,
  optionClick,
  use,
  hasComment = true,
  hasLike = true,
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [agoTime, setAgoTime] = useState(timeAgo(data.createdAt));
  const currentBoard = pathname.split('/')[2];

  // timeAgo를 1분마다 업데이트
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAgoTime(timeAgo(data.createdAt));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [data.createdAt]);

  const handlePostBarClick = () => {
    use === 'post' && navigate(`/board/${currentBoard}/post/${data.postId}`);
    use === 'board' && navigate('/post-search');
  };

  return (
    <div className={styles.post} onClick={handlePostBarClick}>
      <div className={styles.post_top}>
        <Icon id='cloud' width={18} height={11} />
        <p className={styles.name}>{data.userDisplay}</p>
        <p className={styles.dot}>·</p>
        <p>{agoTime}</p>
        {data.isEdited && <p className={styles.edited}>&nbsp;(수정됨)</p>}
      </div>
      <div className={styles.post_center}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.text}>{data.content}</p>
      </div>
      <div className={styles.post_bottom}>
        <span className={styles.board}>{data.boardName}</span>
        <div className={styles.iconContainer}>
          {/* 서버 수정 후 조건문 제거 처리 필요 */}
          {hasComment && data.commentCount !== undefined && (
            <>
              <Icon
                className={styles.comment}
                id='comment'
                width='13'
                height='11'
                fill='#D9D9D9'
              />
              <span>{data.commentCount.toLocaleString()}</span>
            </>
          )}
          {hasLike && (
            <>
              <Icon
                id='like'
                width='12'
                height='11'
                fill={data.isLiked ? '#5F86BF' : '#D9D9D9'}
              />
              <span>{data.likeCount.toLocaleString()}</span>
            </>
          )}
          {/* 서버 수정 후 조건문 제거 처리 필요 */}
          {data.scrapCount !== undefined && (
            <>
              <Icon
                id='bookmark-fill'
                width='9'
                height='11'
                fill={data.isScrapped ? '#5F86BF' : '#D9D9D9'}
              />
              <span>{data.scrapCount.toLocaleString()}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
