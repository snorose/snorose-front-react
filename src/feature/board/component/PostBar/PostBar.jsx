import { Icon, Badge } from '@/shared/component';
import { postBarDateFormat } from '@/shared/lib';
import { ROLE } from '@/shared/constant';

import styles from './PostBar.module.css';

export default function PostBar({ data, hasComment = true, hasLike = true }) {
  // 뱃지가 보이는 ROLE
  const showBadge =
    data.userRoleId === ROLE.official ||
    (data.userRoleId === ROLE.admin && data.userDisplay !== '익명송이');

  return (
    <div className={styles.post}>
      <div className={styles.post_top}>
        <Icon id='cloud' width={23} height={14} />
        <p className={styles.name}>{data.userDisplay}</p>
        {showBadge && (
          <Badge userRoleId={data.userRoleId} className={styles.badge} />
        )}
        <p className={styles.dot}>·</p>
        <div className={styles.dateWrapper}>
          <p className={styles.date}>{postBarDateFormat(data.createdAt)}</p>
          {data.isEdited && <p className={styles.edited}>&nbsp;(수정됨)</p>}
        </div>
        {data.isConfirmed && (
          <Icon
            className={styles.checkCircleIcon}
            id='check-circle'
            width={12}
            height={12}
          />
        )}
        <span className={styles.boardName}>{data.boardName}</span>
      </div>

      <div className={styles.post_center}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.text}>{data.questionDetail ?? data.content}</p>
      </div>

      <div className={styles.post_bottom}>
        <div className={styles.iconContainer}>
          <div className={styles.iconContainer}>
            {[
              hasComment && (
                <div key='comment' className={styles.iconAndCountWrapper}>
                  <Icon
                    className={styles.comment}
                    id='comment'
                    width={16}
                    height={13}
                  />
                  <span>{data.commentCount.toLocaleString()}</span>
                </div>
              ),

              hasLike && (
                <div key='like' className={styles.iconAndCountWrapper}>
                  <Icon
                    id='like'
                    width={14}
                    height={13}
                    fill={data.isLiked ? '#5F86BF' : '#D9D9D9'}
                  />
                  <span>{data.likeCount.toLocaleString()}</span>
                </div>
              ),
              <div key='bookmark' className={styles.iconAndCountWrapper}>
                <Icon
                  id='bookmark-fill'
                  width={11}
                  height={13}
                  fill={data.isScrapped ? '#5F86BF' : '#D9D9D9'}
                />
                <span>{data.scrapCount.toLocaleString()}</span>
              </div>,
            ].filter(Boolean)}
          </div>
        </div>
      </div>
    </div>
  );
}
