import { useState, useEffect } from 'react';
import { Icon } from '../../components/Icon';
import { useNavigate } from 'react-router-dom';
import timeAgo from '../../utils/timeAgo.js';
import styles from './PostBar.module.css';

export default function PostBar({ data, optionClick, use, hasLike = true }) {
  const navigate = useNavigate();
  const [agoTime, setAgoTime] = useState(timeAgo(data.createdAt));

  // timeAgo를 1분마다 업데이트
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAgoTime(timeAgo(data.createdAt));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [data.createdAt]);

  const handlePostBarClick = () => {
    if (use === 'post') {
      navigate(`./post/${data.postId}`);
    }
  };

  return (
    <div className={styles.post} onClick={handlePostBarClick}>
      <div className={styles.post_top}>
        <Icon id='cloud' width={18} height={11} />
        <p className={styles.name}>{data.userDisplay}</p>
        <p className={styles.dot}>·</p>
        <p>{agoTime}</p>
        {data.isEdited && <p className={styles.edited}>&nbsp;(수정됨)</p>}
        <div
          className={styles.more_option}
          onClick={(e) => {
            e.stopPropagation();
            optionClick();
          }}
        >
          <Icon id='ellipsis-vertical' width={3} height={11} fill='#484848' />
        </div>
      </div>
      <div className={styles.post_center}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.text}>{data.content}</p>
      </div>
      <div className={styles.post_bottom}>
        <span className={styles.board}>{data.board}</span>
        <div className={styles.iconContainer}>
          <Icon
            className={styles.comment}
            id='comment'
            width='13'
            height='11'
            fill='#D9D9D9'
          />
          <span>{data.commentCount}</span>
          {hasLike && (
            <>
              <Icon
                id='like'
                width='12'
                height='11'
                fill={data.liked ? '#5F86BF' : '#D9D9D9'}
              />
              <span>{data.likeCount}</span>
            </>
          )}
          <Icon
            id='bookmark-fill'
            width='9'
            height='11'
            fill={data.liked ? '#5F86BF' : '#D9D9D9'}
          />
          <span>{data.scrapCount}</span>
        </div>
      </div>
    </div>
  );
}
