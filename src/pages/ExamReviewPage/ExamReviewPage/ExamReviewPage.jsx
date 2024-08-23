import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getReviewList, searchByBoard } from '@/apis';

import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx';

import {
  AppBar,
  DropDownBlue,
  Loading,
  PostBar,
  PTR,
  Search,
  WriteButton,
} from '@/components';

import { BOARD_ID, YEARS, SEMESTERS, EXAM_TYPES } from '@/constants';

import styles from './ExamReviewPage.module.css';

export default function ExamReviewPage() {
  const [keyword, setKeyword] = useState('');
  const [lectureYear, setLectureYear] = useState();
  const [semester, setSemester] = useState();
  const [examType, setExamType] = useState();

  const { data, ref, isFetching, status, Target } = useInfiniteScroll({
    queryKey: keyword
      ? [
          'reviewList',
          'search',
          keyword,
          {
            lectureYear: lectureYear?.id,
            semester: semester?.id,
            examType: examType?.id,
          },
        ]
      : ['reviewList'],
    queryFn: keyword
      ? ({ pageParam }) =>
          searchByBoard({
            boardId: BOARD_ID['exam-review'],
            page: pageParam,
            keyword,
            lectureYear: lectureYear?.id,
            semester: semester?.id,
            examType: examType?.id,
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
      <div className={styles.filters}>
        <DropDownBlue
          options={YEARS}
          placeholder='연도'
          select={lectureYear}
          setFn={setLectureYear}
        />
        <DropDownBlue
          options={SEMESTERS}
          placeholder='학기'
          select={semester}
          setFn={setSemester}
        />
        <DropDownBlue
          options={EXAM_TYPES}
          placeholder='시험 종류'
          select={examType}
          setFn={setExamType}
        />
      </div>
      <PTR>
        <ul className={styles.list}>
          {status !== 'error' && reviewList.length > 0 ? (
            reviewList.map((post) => (
              <Link
                className={styles.to}
                key={post.postId}
                to={`/board/exam-review/post/${post.postId}`}
              >
                <PostBar data={post} hasLike={false} />
              </Link>
            ))
          ) : (
            <div className={styles.noting}>
              {keyword ? '검색 결과가 없습니다' : '후기를 등록해주세요'}
            </div>
          )}
        </ul>
        {isFetching && <Loading />}
        {reviewList.length > 0 && <Target ref={ref} height='100px' />}
      </PTR>
      <WriteButton to='/board/exam-review-write' />
    </main>
  );
}
