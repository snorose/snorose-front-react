import { Link, useLocation } from 'react-router-dom';

import { useSearch } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { FetchLoading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';
import { Search } from '@/components/Search';

import { getBoardTitleToTextId } from '@/utils';
import { PLACEHOLDER } from '@/constants';

import styles from './PostSearchPage.module.css';

export default function PostSearchPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/')[2];

  const urlKeyword = decodeURIComponent(pathname.split('/')[4] || '');

  const {
    data,
    ref,
    isLoading,
    isError,
    error,
    handleChange,
    handleOnKeyDown,
    keyword,
  } = useSearch({
    urlKeyword,
  });

  if (isLoading) {
    return <FetchLoading>검색 중</FetchLoading>;
  }

  if (isError) {
    if (error.response.status === 404) {
      return (
        <FetchLoading animation={false}>검색 결과가 없습니다</FetchLoading>
      );
    }

    return (
      <FetchLoading animation={false}>잠시 후 다시 시도해 주세요</FetchLoading>
    );
  }

  const postList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page.data)
      : [];

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
          {postList.map((post, index) => (
            <Link
              className={styles.to}
              ref={index === postList.length - 1 ? ref : undefined}
              key={post.postId}
              to={`/board/${getBoardTitleToTextId(post.boardName)}/post/${post.postId}`}
            >
              <PostBar data={post} hasComment={false} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
