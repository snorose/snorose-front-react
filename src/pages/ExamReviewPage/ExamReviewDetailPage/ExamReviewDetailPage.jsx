import { useParams } from 'react-router-dom';

import { BackAppBar } from '../../../components/AppBar/index.js';
import { ReviewContentItem } from '../../../components/ReviewContentItem';
import { Icon } from '../../../components/Icon/index.js';
import { InputBar } from '../../../components/InputBar';

import { dateFormat } from '../../../utils/formatDate.js';
import { convertToObject } from '../../../utils/convertDS.js';
import { COMMENT_LIST, REVIEW_DETAIL } from '../../../dummy/data';

import {
  COURSE_CATEGORY,
  SEMESTERS,
  TEST_CATEGORY,
} from '../../../constants/index.js';

import styles from './ExamReviewDetailPage.module.css';
import ReviewDownload from '../../../components/ReviewDownload/ReviewDownload.jsx';
import Comment from '../../../components/Comment/Comment/Comment.jsx';

const COURSE_TYPE = convertToObject(COURSE_CATEGORY);
const SEMESTER = convertToObject(SEMESTERS);
const EXAM_TYPE = convertToObject(TEST_CATEGORY);

export default function ExamReviewDetailPage() {
  const { postId } = useParams();
  const {
    userDisplay,
    createdAt,
    confirmed,
    title,
    lectureName,
    professor,
    lectureType,
    lectureYear,
    semester,
    examType,
    isPF,
    questionDetail,
    fileName,
  } = REVIEW_DETAIL;
  console.log(postId);

  return (
    <main>
      <div className={styles.top}>
        <BackAppBar />
        <div className={styles.displayBox}>
          <div className={styles.displayBoxLeft}>
            <Icon
              className={styles.cloudIcon}
              id='cloud'
              width='25'
              height='16'
            />
            <span>{userDisplay}</span>
            <span className={styles.dot}></span>
            <span>{dateFormat(createdAt)}</span>
            {confirmed && (
              <Icon
                className={styles.checkCircleIcon}
                id='check-circle'
                width='15'
                height='15'
              />
            )}
          </div>
          <Icon id='ellipsis-vertical' width='3' height='11' />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>
          <ReviewContentItem tag='강의명' value={lectureName} />
          <ReviewContentItem tag='교수' value={professor} />
          <ReviewContentItem tag='강의 종류' value={COURSE_TYPE[lectureType]} />
          <ReviewContentItem
            tag='수강 학기'
            value={`${lectureYear % 100}-${SEMESTER[semester]}`}
          />
          <ReviewContentItem tag='시험 종류' value={EXAM_TYPE[examType]} />
          <ReviewContentItem tag='P/F 여부' value={isPF ? 'O' : 'X'} />
          <ReviewContentItem tag='시험 유형 및 문항수' value={questionDetail} />
        </div>
        <ReviewDownload className={styles.fileDownload} fileName={fileName} />
      </div>
      <div className={styles.comments}>
        <p className={styles.commentsTitle}>댓글 2개</p>
        {COMMENT_LIST &&
          COMMENT_LIST.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
      </div>
      <InputBar />
    </main>
  );
}
