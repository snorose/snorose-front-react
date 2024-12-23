import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getNoticeLine } from '@/apis';
import { useScrollRestoration } from '@/hooks';
import { SearchExamReviewsSuspense } from '@/pages/ExamReviewsPage';
import {
  AppBar,
  Search,
  WriteButton,
  Icon,
  Filter,
  Filters,
} from '@/components';

import { YEARS, SEMESTERS, EXAM_TYPES, QUERY_KEY } from '@/constants';

import styles from './ExamReviewsPage.module.css';

export default function ExamReviewsPage() {
  const { data: noticeLineData } = useQuery({
    queryKey: [QUERY_KEY.noticeLine, 32],
    queryFn: () => getNoticeLine(32),
  });

  const { scrollRef, saveScrollPosition } = useScrollRestoration();

  return (
    <section className={styles.container} ref={scrollRef}>
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

      <Search className={styles.search} placeholder='시험후기 검색' />
      <Filters>
        <Filter filterKey='lectureYear' options={YEARS} placeholder='연도' />
        <Filter filterKey='semester' options={SEMESTERS} placeholder='학기' />
        <Filter
          filterKey='examType'
          options={EXAM_TYPES}
          placeholder='시험 종류'
        />
      </Filters>
      <SearchExamReviewsSuspense saveScrollPosition={saveScrollPosition} />

      <WriteButton to='/board/exam-review-write' />
    </section>
  );
}
