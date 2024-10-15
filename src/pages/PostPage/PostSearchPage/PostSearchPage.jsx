import { useLocation } from 'react-router-dom';

import { useSearch, useScrollRestoration } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { PostList } from '@/components/PostList';
import { Search } from '@/components/Search';

import { PLACEHOLDER } from '@/constants';

import styles from './PostSearchPage.module.css';

export default function PostSearchPage() {
  const { pathname, search } = useLocation();
  const current = pathname.split('/')[2];

  const { scrollRef, saveScrollPosition } = useScrollRestoration();

  const queryParams = new URLSearchParams(search);
  const urlKeyword = queryParams.get('query');

  const searchResult = useSearch({
    urlKeyword,
  });

  const { handleChange, handleOnKeyDown, keyword } = searchResult;

  return (
    <div className={styles.container} ref={scrollRef}>
      <BackAppBar
        children={
          <Search
            placeholder={PLACEHOLDER[current]}
            keyword={keyword}
            handleKeyDown={handleOnKeyDown}
            onChange={handleChange}
          />
        }
        hasSearchInput={true}
        backNavTo={current !== 'all' ? `/board/${current}` : `/board`}
      />
      <PostList result={searchResult} saveScrollPosition={saveScrollPosition} />
    </div>
  );
}
