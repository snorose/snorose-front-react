import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './EventForm.module.css';

export default function EventForm({ formType, data, onChange }) {
  const [title, setTitle] = useState(''); // 제목
  const [content, setContent] = useState(''); // 상세설명
  const [host, setHost] = useState(''); // 공연명
  const [place, setPlace] = useState(''); // 장소
  const [startDate, setStartDate] = useState(''); // 응모 시작일
  const [endDate, setEndDate] = useState(''); // 응모 마감일
  const [announceDate, setAnnounceDate] = useState(''); // 당첨자 발표일
  const [drawCount, setDrawCount] = useState(1); // 추첨 인원
  const [link, setLink] = useState(''); // 연계 링크
  const [attachments, setAttachments] = useState(''); // 이미지 (첨부 파일)

  return (
    <div className={styles.form}>
      <div>
        <p>제목</p>
        <TextareaAutosize
          className={styles.textarea}
          placeholder='이벤트 제목을 입력해주세요'
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div>
        {formType === 'theater' ? (
          <p>공연명</p>
        ) : formType === 'movie' ? (
          <p>영화명</p>
        ) : (
          <p>회사명</p>
        )}
        <TextareaAutosize
          className={styles.textarea}
          placeholder={
            formType === 'theater'
              ? '공연명을 입력해주세요'
              : formType === 'movie'
                ? '영화명을 입력해주세요'
                : '회사명을 입력해주세요'
          }
          value={data.host}
          onChange={(e) => onChange('host', e.target.value)}
        />
      </div>
      {['theater', 'movie'].includes(formType) && (
        <div>
          <p>장소</p>
          <TextareaAutosize
            className={styles.textarea}
            placeholder='장소를 입력해주세요'
            value={data.place}
            onChange={(e) => onChange('place', e.target.value)}
          />
        </div>
      )}

      <div>
        <p>응모 날짜</p>
        <div className={styles.dateRangeWrapper}>
          <input
            id='start-date'
            type='date'
            value={data.startDate}
            onChange={(e) => onChange('startDate', e.target.value)}
            className={styles.dateInput}
          />
          <span className={styles.dateSeparator}>~</span>
          <input
            type='date'
            value={data.endDate}
            onChange={(e) => onChange('endDate', e.target.value)}
            className={styles.dateInput}
          />
        </div>
      </div>
      <div>
        <p>당첨자 발표일</p>
        <input
          type='date'
          value={data.announceDate}
          onChange={(e) => onChange('announceDate', e.target.value)}
          className={styles.announceDate}
        />
      </div>
      <div className={styles.drawCount}>
        <p>추첨 인원</p>
        <div className={styles.counterControls}>
          <button
            className={styles.minus}
            onClick={() => onChange('drawCount', data.drawCount - 1)}
            disabled={data.drawCount <= 1}
          >
            -
          </button>
          <span className={styles.count}>{data.drawCount}</span>
          <button
            className={styles.plus}
            onClick={() => onChange('drawCount', data.drawCount + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div>
        <p>상세 설명</p>
        <TextareaAutosize
          className={`${styles.textarea} ${styles.contentArea}`}
          placeholder='이벤트에 관한 상세 설명을 입력해주세요'
          value={data.content}
          onChange={(e) => onChange('content', e.target.value)}
        />
      </div>
      <div>
        <p>연계 링크</p>
        <TextareaAutosize
          className={styles.textarea}
          placeholder={
            ['theater', 'movie'].includes(formType)
              ? '추첨 구글폼을 넣어주세요'
              : '관련 링크를 넣어주세요'
          }
          value={data.link}
          onChange={(e) => onChange('link', e.target.value)}
        />
      </div>
      <div className={styles.image}>
        <p>이미지</p>
      </div>
    </div>
  );
}
