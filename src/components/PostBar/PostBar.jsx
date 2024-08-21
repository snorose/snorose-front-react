import { Icon } from '../../components/Icon';
import { useNavigate } from 'react-router-dom';
import timeAgo from '../../utils/timeAgo.js';
import styles from './PostBar.module.css';

export default function PostBar({ data, optionClick, use }) {
  const navigate = useNavigate();
  const givenTime = data.createdAt;
  const agoTime = timeAgo(givenTime);

  const handlePostBarClick = () => {
    use === 'post' && navigate(`./post/${data.postId}`);
  };

  return (
    <div className={styles.post} onClick={handlePostBarClick}>
      <div className={styles.post_top}>
        <Icon id='cloud' width={18} height={11} />
        <p className={styles.name}>{data.userDisplay}</p>
        <p className={styles.dot}>·</p>
        <p>{agoTime}</p>
        {data.isEdited ? <p className={styles.edited}>&nbsp;(수정됨)</p> : null}
        <div className={styles.more_option} onClick={optionClick}>
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
          <Icon
            id='like'
            width='12'
            height='11'
            fill={data.liked ? '#5F86BF' : '#D9D9D9'}
          />
          <span>{data.likeCount}</span>
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
