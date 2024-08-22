import styles from './PostSearchPage.module.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from '../../../components/Search';
import { BackAppBar } from '../../../components/AppBar';
import { PostBar } from '../../../components/PostBar';
import { BOARD_ID, PLACEHOLDER } from '@/constants';
import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx';
import { searchByBoard, searchAllBoard } from '@/apis';

export default function PostSearchPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/')[2];
  const urlKeyword = decodeURIComponent(pathname.split('/')[4] || '');
  const [keyword, setKeyword] = useState(urlKeyword);

  const handleSearch = (text) => {
    setKeyword(text);
  };

  useEffect(() => {
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  const { data, ref, isFetching, Target } = useInfiniteScroll({
    queryKey: ['postList', keyword || 'default'],
    queryFn: ({ pageParam }) => {
      if (current === 'all') {
        return searchAllBoard({ page: pageParam, keyword: keyword || '' });
      } else {
        return searchByBoard({
          boardId: BOARD_ID[current],
          page: pageParam,
          keyword: keyword || '',
        });
      }
    },
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
            setKeyword={handleSearch}
            isAllSearch={false}
          />
        }
        hasSearchInput={true}
      />
      <div className={styles.content}>
        {keyword && postList.length === 0 ? (
          <div className={styles.noResult}>검색 결과가 없습니다</div>
        ) : (
          <div className={styles.posts}>
            {postList.map((post) => (
              <PostBar key={post.postId} data={post} use='post' hasComment={false}/>
            ))}
          </div>
        )}
        {isFetching && <div className={styles.loading}>로딩 중...</div>}
        {postList.length > 0 && <Target ref={ref} height='100px' />}
      </div>
    </div>
  );
}
