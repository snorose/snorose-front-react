import { Link } from 'react-router-dom';

import { useSuspensePagination } from '@/hooks';
import { FetchLoading, Icon, PostBar } from '@/components';
import {
  deduplicatePaginatedData,
  flatPaginationCache,
  getBoardTextId,
} from '@/utils';
import { ACTIVITIES, STALE_TIME } from '@/constants';

import styles from './Posts.module.css';

export default function Posts({
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
        ;
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
