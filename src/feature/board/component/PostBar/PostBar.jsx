import { Badge, Icon } from '@/shared/component';
import { ROLE } from '@/shared/constant';
import { postBarDateFormat } from '@/shared/lib';

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
        <p>{postBarDateFormat(data.createdAt)}</p>
        {data.isEdited && <p className={styles.edited}>&nbsp;(수정됨)</p>}
        {data.isConfirmed && (
          <Icon
            className={styles.checkCircleIcon}
            id='check-circle'
            width={12}
            height={12}
          />
        )}
        <div className={styles.boardChip}>{data.boardName}</div>
      </div>
      <div className={styles.post_center}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.text}>{data.questionDetail ?? data.content}</p>
      </div>
      <div className={styles.post_bottom}>
        <div className={styles.iconListContainer}>
          {data.likeCount > 0 && (
            <div className={styles.iconContainer}>
              <Icon
                id='like-stroke'
                width={14}
                height={13}
                fill={data.isLiked ? 'var(--pink-2)' : 'none'}
                stroke={'var(--pink-2)'}
              />
              <span>{data.likeCount.toLocaleString()}</span>
            </div>
          )}
          {data.commentCount > 0 && (
            <div className={styles.iconContainer}>
              <Icon
                className={styles.comment}
                id='comment-stroke'
                width={16}
                height={13}
                fill='none'
                stroke={'var(--blue-3)'}
              />
              <span>{data.commentCount.toLocaleString()}</span>
            </div>
          )}
          {data.scrapCount > 0 && (
            <div className={styles.iconContainer}>
              <Icon
                id='scrap-stroke'
                width={11}
                height={13}
                fill={data.isScrapped ? 'var(--green-1)' : 'none'}
                stroke={'var(--green-1)'}
              />
              <span>{data?.scrapCount.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
