import { useLocation } from 'react-router-dom';

import { useSearch } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { FetchLoading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';
import { Search } from '@/components/Search';
import { Target } from '@/components/Target';

import { PLACEHOLDER } from '@/constants';

import styles from './PostSearchPage.module.css';

export default function PostSearchPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/')[2];

  const urlKeyword = decodeURIComponent(pathname.split('/')[4] || '');

  const { data, ref, isLoading, handleChange, handleOnKeyDown, keyword } =
    useSearch({
      urlKeyword,
    });

  const postList =
    data && data.pages ? data.pages.flatMap((page) => page || []) : [];

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
        backNavTo={'/board'}
      />
      <div className={styles.content}>
        {isLoading ? (
          <FetchLoading>검색 중</FetchLoading>
        ) : (
          <>
            {urlKeyword !== '' && postList.length === 0 ? (
              <div className={styles.noResult}>검색 결과가 없습니다</div>
            ) : (
              <div className={styles.posts}>
                {postList.map((post) => (
                  <PostBar
                    key={post.postId}
                    data={post}
                    use='post'
                    hasComment={false}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {postList.length > 0 && <Target ref={ref} height='100px' />}
      </div>
    </div>
  );
}
