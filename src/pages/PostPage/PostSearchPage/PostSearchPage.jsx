import { useLocation } from 'react-router-dom';

import { useSearch, useScrollRestoration } from '@/hooks';
import { BackAppBar } from '@/components/AppBar';
import { PostList } from '@/components/PostList';
import { Search } from '@/components/Search';
import { BOARDS, PLACEHOLDER } from '@/constants';

import styles from './PostSearchPage.module.css';

export default function PostSearchPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/')[2];
  const boardId = BOARDS.find(({ path }) => pathname.includes(path)).id;

  const searchResult = useSearch({ boardId });

  const { scrollRef, saveScrollPosition } = useScrollRestoration();

  return (
    <div className={styles.container} ref={scrollRef}>
      <BackAppBar
        hasSearchInput={true}
        backNavTo={current !== 'all' ? `/board/${current}` : `/board`}
      >
        <Search placeholder={PLACEHOLDER[current]} />
      </BackAppBar>
      <PostList result={searchResult} saveScrollPosition={saveScrollPosition} />
    </div>
  );
}
