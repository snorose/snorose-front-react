import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getReviewList, searchByBoard } from '@/apis';

import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx';

import { AppBar } from '@/components/AppBar';
import { Loading } from '@/components/Loading';
import { PostBar } from '@/components/PostBar';
import { PTR } from '@/components/PTR';
import { Search } from '@/components/Search';

import { BOARD_ID } from '@/constants';

import styles from './ExamReviewPage.module.css';

export default function ExamReviewPage() {
  const [keyword, setKeyword] = useState();
  const { data, ref, isFetching, status, Target } = useInfiniteScroll({
    queryKey: keyword ? ['reviewList', 'search', keyword] : ['reviewList'],
    queryFn: keyword
      ? ({ pageParam }) =>
          searchByBoard({
            boardId: BOARD_ID['exam-review'],
            page: pageParam,
            keyword,
          })
      : ({ pageParam }) => getReviewList(pageParam),
  });

  const reviewList =
    data && !data.pages.includes(undefined)
      ? data.pages.flatMap((page) => page)
      : [];

  return (
    <main>
      <AppBar title='시험후기' />
      <Search
        className={styles.search}
        placeholder='시험후기 검색'
        setKeyword={setKeyword}
      />
      <PTR>
        <ul className={styles.list}>
          {status !== 'error' && reviewList.length > 0 ? (
            reviewList.map((post) => (
              <Link
                className={styles.to}
                key={post.postId}
                to={`/board/exam-review/${post.postId}`}
              >
                <PostBar data={post} />
              </Link>
            ))
          ) : (
            <div className={styles.noting}>후기를 등록해주세요</div>
          )}
        </ul>
        {isFetching && <Loading />}
        {reviewList.length > 0 && <Target ref={ref} height='100px' />}
      </PTR>
    </main>
  );
}
