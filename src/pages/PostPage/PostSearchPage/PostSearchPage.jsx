import { useLocation } from 'react-router-dom';

import { useSearch } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { PostList } from '@/components/PostList';
import { Search } from '@/components/Search';

import { PLACEHOLDER } from '@/constants';

import styles from './PostSearchPage.module.css';

export default function PostSearchPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/')[2];

  const urlKeyword = decodeURIComponent(pathname.split('/')[4] || '');

  const searchResult = useSearch({
    urlKeyword,
  });

  const { handleChange, handleOnKeyDown, keyword } = searchResult;

  return (
    <div className={styles.container}>
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
      <div className={styles.content}>
        <div className={styles.posts}>
          <PostList result={searchResult} />
        </div>
      </div>
    </div>
  );
}
