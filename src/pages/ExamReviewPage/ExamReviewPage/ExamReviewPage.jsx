import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getReviewList, getNoticeLine } from '@/apis';

import { usePagination, useSearch } from '@/hooks';

import { ExamReviewList, ExamReviewSearchList } from '@/pages/ExamReviewPage';

import { AppBar, DropDownBlue, Search, WriteButton, Icon } from '@/components';

import { convertToObject } from '@/utils';
import { YEARS, SEMESTERS, EXAM_TYPES } from '@/constants';

import styles from './ExamReviewPage.module.css';

const LECTURE_YEAR_LEBEL = convertToObject(YEARS);
const SEMESTER_LEBEL = convertToObject(SEMESTERS);
const EXAM_TYPE_LEBEL = convertToObject(EXAM_TYPES);

export default function ExamReviewPage() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const urlKeyword = decodeURIComponent(pathname.split('/')[4] || '');
  const queryParams = new URLSearchParams(search);

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

  const reviewResult = usePagination({
    queryKey: ['reviewList'],
    queryFn: ({ pageParam }) => getReviewList(pageParam),
    enabled: urlKeyword === '',
  });

  const searchResult = useSearch({
    urlKeyword,
    filterOption: {
      lectureYear: lectureYear?.id,
      semester: semester?.id,
      examType: examType?.id,
    },
  });

  const { handleChange, handleOnKeyDown, keyword } = searchResult;

  const { data: noticeLineData } = useQuery({
    queryKey: ['noticeLine', 32],
    queryFn: () => getNoticeLine(32),
  });

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

    if (keyword === '') {
      navigate(`/board/exam-review`);
      return;
    }

    navigate(
      `/board/exam-review/search/${encodeURIComponent(keyword)}?${param}`
    );
  }, [lectureYear, semester, examType]);

  return (
    <main>
      <AppBar title='시험후기' />
      <div className={styles.notification}>
        <Link
          className={styles.notification_bar}
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

      {urlKeyword !== '' ? (
        <ExamReviewSearchList result={searchResult} />
      ) : (
        <ExamReviewList result={reviewResult} />
      )}

      <WriteButton to='/board/exam-review-write' />
    </main>
  );
}
