import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getReviews, getNoticeLine } from '@/apis';
import { usePagination, useSearch, useScrollRestoration } from '@/hooks';
import { ExamReviews, ExamReviewSearchList } from '@/pages/ExamReviewsPage';
import { AppBar, DropDownBlue, Search, WriteButton, Icon } from '@/components';
import { convertToObject } from '@/utils';
import {
  YEARS,
  SEMESTERS,
  EXAM_TYPES,
  QUERY_KEY,
  STALE_TIME,
} from '@/constants';

import styles from './ExamReviewsPage.module.css';

const LECTURE_YEAR_LEBEL = convertToObject(YEARS);
const SEMESTER_LEBEL = convertToObject(SEMESTERS);
const EXAM_TYPE_LEBEL = convertToObject(EXAM_TYPES);

export default function ExamReviewsPage() {
  const { scrollRef, saveScrollPosition } = useScrollRestoration();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const urlKeyword = queryParams.get('query');

  const [isOpen, setIsOpen] = useState({
    year: false,
    semester: false,
    examType: false,
  });

  const [lectureYear, setLectureYear] = useState({
    id: queryParams.get('lectureYear'),
    name: LECTURE_YEAR_LEBEL[queryParams.get('lectureYear')],
  });
  const [semester, setSemester] = useState({
    id: queryParams.get('semester'),
    name: SEMESTER_LEBEL[queryParams.get('semester')],
  });
  const [examType, setExamType] = useState({
    id: queryParams.get('examType'),
    name: EXAM_TYPE_LEBEL[queryParams.get('examType')],
  });

  const { data: noticeLineData } = useQuery({
    queryKey: [QUERY_KEY.noticeLine, 32],
    queryFn: () => getNoticeLine(32),
  });

  const isSearchCondition = !!(
    urlKeyword ||
    lectureYear?.id ||
    semester?.id ||
    examType?.id
  );

  const reviewResult = usePagination({
    queryKey: [QUERY_KEY.posts, 32],
    queryFn: ({ pageParam }) => getReviews(pageParam),
    staleTime: STALE_TIME.examReview,
    enabled: !isSearchCondition,
  });

  const searchResult = useSearch({
    urlKeyword,
    filterOption: {
      lectureYear: lectureYear?.id,
      semester: semester?.id,
      examType: examType?.id,
    },
    enabled: isSearchCondition,
  });

  const { handleChange, handleOnKeyDown, keyword } = searchResult;

  useEffect(() => {
    const filterOption = {
      lectureYear: lectureYear?.id,
      semester: semester?.id,
      examType: examType?.id,
    };
    const param = Object.entries(filterOption).reduce(
      (result, [key, value]) => (value ? `${result}&${key}=${value}` : result),
      ''
    );

    if (!isSearchCondition) {
      navigate(`/board/exam-review`, { replace: true });
      return;
    }

    navigate(
      `/board/exam-review/search?query=${encodeURIComponent(keyword)}${param}`,
      { replace: true }
    );
  }, [lectureYear, semester, examType]);

  return (
    <main className={styles.container} ref={scrollRef}>
      <AppBar title='시험후기' />
      <div className={styles.notification}>
        <Link
          className={styles.notificationBar}
          to={`/board/exam-review/notice`}
        >
          <Icon id='notice-bell' width={11} height={13} />
          <p>[필독]&nbsp;&nbsp;{noticeLineData?.title}</p>
        </Link>
      </div>

      <Search
        className={styles.search}
        placeholder='시험후기 검색'
        keyword={keyword}
        handleKeyDown={handleOnKeyDown}
        onChange={handleChange}
      />
      <div className={styles.filters}>
        <DropDownBlue
          options={YEARS}
          placeholder='연도'
          name='year'
          select={lectureYear}
          setFn={setLectureYear}
          isOpen={isOpen['year']}
          setIsOpen={setIsOpen}
        />
        <DropDownBlue
          options={SEMESTERS}
          placeholder='학기'
          name='semester'
          select={semester}
          setFn={setSemester}
          isOpen={isOpen['semester']}
          setIsOpen={setIsOpen}
        />
        <DropDownBlue
          options={EXAM_TYPES}
          placeholder='시험 종류'
          name='examType'
          select={examType}
          setFn={setExamType}
          isOpen={isOpen['examType']}
          setIsOpen={setIsOpen}
        />
      </div>
      {isSearchCondition ? (
        <ExamReviewSearchList
          result={searchResult}
          saveScrollPosition={saveScrollPosition}
        />
      ) : (
        <ExamReviews
          result={reviewResult}
          saveScrollPosition={saveScrollPosition}
        />
      )}

      <WriteButton to='/board/exam-review-write' />
    </main>
  );
}
