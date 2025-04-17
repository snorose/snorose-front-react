import { Icon } from '@/shared/component';
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
        <Icon id='cloud' width={18} height={11} />
        <p className={styles.name}>{data.userDisplay}</p>
        {showBadge && (
          <Icon
            className={styles.badge}
            id={
              data.userRoleId === ROLE.official
                ? 'official-badge'
                : 'admin-badge'
            }
            width={16}
            height={16}
          />
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
      </div>
      <div className={styles.post_center}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.text}>{data.questionDetail ?? data.content}</p>
      </div>
      <div className={styles.post_bottom}>
        <span className={styles.board}>{data.boardName}</span>
        <div className={styles.iconContainer}>
          {/* 서버 수정 후 조건문 제거 처리 필요 */}
          {hasComment && (
            <>
              <Icon
                className={styles.comment}
                id='comment'
                width={13}
                height={11}
              />
              <span>{data.commentCount.toLocaleString()}</span>
            </>
          )}
          {hasLike && (
            <>
              <Icon
                id='like'
                width={12}
                height={11}
                fill={data.isLiked ? '#5F86BF' : '#D9D9D9'}
              />
              <span>{data.likeCount.toLocaleString()}</span>
            </>
          )}
          {/* 서버 수정 후 조건문 제거 처리 필요 */}
          <>
            <Icon
              id='bookmark-fill'
              width={9}
              height={11}
              fill={data.isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <span>{data?.scrapCount.toLocaleString()}</span>
          </>
        </div>
      </div>
    </div>
  );
}
