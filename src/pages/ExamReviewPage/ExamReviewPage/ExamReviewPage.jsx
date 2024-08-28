import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getReviewList } from '@/apis';

import { useInfiniteScroll, useSearch } from '@/hooks';

import { ExamReviewList, ExamReviewSearchList } from '@/pages/ExamReviewPage';

import { AppBar, DropDownBlue, PTR, Search, WriteButton } from '@/components';

import { YEARS, SEMESTERS, EXAM_TYPES } from '@/constants';

import styles from './ExamReviewPage.module.css';

export default function ExamReviewPage() {
  const { pathname } = useLocation();
  const urlKeyword = decodeURIComponent(pathname.split('/')[4] || '');

  const [lectureYear, setLectureYear] = useState();
  const [semester, setSemester] = useState();
  const [examType, setExamType] = useState();

  const reviewResult = useInfiniteScroll({
    queryKey: ['reviewList'],
    queryFn: ({ pageParam }) => getReviewList(pageParam),
  });

  const searchResult = useSearch({
    urlKeyword,
    filterOption: {
      lectureYear: lectureYear?.id,
      semester: semester?.id,
      examType: examType?.id,
    },
  });

  return (
    <main>
      <AppBar title='시험후기' />
      <Search
        className={styles.search}
        placeholder='시험후기 검색'
        value={searchResult.keyword}
        onChange={searchResult.handleChange}
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
        {searchResult.debouncedKeyword ? (
          <ExamReviewSearchList result={searchResult} />
        ) : (
          <ExamReviewList result={reviewResult} />
        )}
      </PTR>
      <WriteButton to='/board/exam-review-write' />
    </main>
  );
}
