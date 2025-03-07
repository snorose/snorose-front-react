import { useLocation, Link } from 'react-router-dom';

import { FetchLoading, List, PullToRefresh } from '@/shared/component';
import {
  getBoardTitleToTextId,
  deduplicatePaginatedData,
  flatPaginationCache,
} from '@/shared/lib';
import { BOARDS } from '@/shared/constant';

import { PostBar } from '@/feature/board/component';
import { useSearch } from '@/feature/search/hook';

import styles from './SearchResultList.module.css';

export default function SearchResultList({ saveScrollPosition }) {
  const { pathname } = useLocation();
  const boardId = BOARDS.find(({ path }) => pathname.includes(path)).id;

  const { data, ref, isFetching, refetch } = useSearch({ boardId });
  const postList = deduplicatePaginatedData(flatPaginationCache(data));

  return (
    <PullToRefresh
      onRefresh={() => refetch().then(() => console.log('Refreshed!'))}
    >
      <List>
        {postList.map((post, index) => (
          <Link
            className={styles.to}
            ref={index === postList.length - 1 ? ref : undefined}
            key={post.postId}
            to={`/board/${getBoardTitleToTextId(post.boardName)}/post/${post.postId}`}
            onClick={saveScrollPosition}
          >
            <PostBar data={post} />
          </Link>
        ))}
        {isFetching && <FetchLoading />}
      </List>
    </PullToRefresh>
  );
}
