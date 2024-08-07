import styles from './PostSearchPage.module.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from '../../../components/Search';
import { PLACEHOLDER } from '../../../constants';
import { BackAppBar } from '../../../components/AppBar';
import { PostBar } from '../../../components/PostBar';
import { POST_LIST } from '../../../dummy/data/postList.js';

export default function PostSearchPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/')[2];
  const [keyword, setKeyword] = useState('url에서 가져온 query값');
  const [noResult, setNoResult] = useState(false);

  const handleSearch = (text) => {
    setKeyword(text);
  };

  useEffect(() => {
    if (keyword !== '') {
      console.log(keyword);
    }
  }, [keyword]);

  return (
    <div className={styles.container}>
      <BackAppBar
        children={
          <Search
            placeholder={PLACEHOLDER[current]}
            onSearch={handleSearch}
            keyWord={keyword}
          />
        }
        hasSearchInput={true}
      />
      <div className={styles.content}>
        {keyword === '' ? null : noResult ? (
          <div className={styles.noResult}>검색 결과가 없습니다</div>
        ) : (
          <div className={styles.posts}>
            {POST_LIST &&
              POST_LIST.map((post) => (
                <PostBar key={post.postId} data={post} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
