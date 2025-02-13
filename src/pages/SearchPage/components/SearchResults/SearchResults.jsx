import { useLocation, Link } from 'react-router-dom';

import { useSearch } from '@/hooks';
import { List, FetchLoading, PostBar, PTR } from '@/components';
import {
  deduplicatePaginatedData,
  flatPaginationCache,
  getBoardTitleToTextId,
} from '@/utils';
import { BOARDS } from '@/constants';

import styles from './SearchResults.module.css';

export default function SearchResults({ saveScrollPosition }) {
  const { pathname } = useLocation();
  const boardId = BOARDS.find(({ path }) => pathname.includes(path)).id;

  const { data, ref, isFetching, refetch } = useSearch({ boardId });
  const postList = deduplicatePaginatedData(flatPaginationCache(data));

  return (
    <PTR onRefresh={() => refetch().then(() => console.log('Refreshed!'))}>
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
    </PTR>
  );
}
