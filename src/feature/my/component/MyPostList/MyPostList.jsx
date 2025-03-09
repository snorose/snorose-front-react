import { Link } from 'react-router-dom';

import { useSuspensePagination } from '@/shared/hook';
import { FetchLoading, Icon } from '@/shared/component';
import {
  getBoardTextId,
  deduplicatePaginatedData,
  flatPaginationCache,
} from '@/shared/lib';
import { STALE_TIME } from '@/shared/constant';

import { PostBar } from '@/feature/board/component';

import styles from './MyPostList.module.css';
import { ACTIVITIES } from '../../constant/activity';

export default function MyPostList({
  queryKey,
  queryFn,
  hasLike = true,
  errorMessage,
  saveScrollPosition,
}) {
  const { data, ref, isFetching } = useSuspensePagination({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => queryFn({ page: pageParam }),
    staleTime: STALE_TIME.mypageActivity,
  });

  const list = deduplicatePaginatedData(flatPaginationCache(data));

  const activity = ACTIVITIES.find(
    (activity) => activity.queryKey === queryKey
  );
  const emptyStateIllustrationId =
    activity?.emptyStateIllustrationId || 'star-no-post';

  if (list.length === 0) {
    return (
      <div className={styles.noContentWrapper}>
        <p className={styles.noContentMessage}>{errorMessage}</p>
        <div className={styles.imageWrapper}>
          <Icon id={emptyStateIllustrationId} width={220} height={182} />
        </div>
      </div>
    );
  }

  const makePath = ({ boardId, postId }) => {
    if (boardId) {
      return `/board/${getBoardTextId(boardId)}/post/${postId}`;
    }

    return `/board/exam-review/post/${postId}`;
  };

  return (
    <ul className={styles.posts}>
      {list.map((post, index) => (
        <Link
          className={styles.to}
          ref={index === list.length - 1 ? ref : undefined}
          key={post.postId}
          to={makePath({ boardId: post.boardId, postId: post.postId })}
          onClick={saveScrollPosition}
        >
          <PostBar data={post} hasLike={hasLike} />
        </Link>
      ))}
      {isFetching && <FetchLoading />}
    </ul>
  );
}
