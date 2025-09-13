import { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './EventForm.module.css';
import { eventTime } from '@/shared/lib';
import { PrimaryButton } from '@/shared/component';

export default function EventForm({
  formType,
  data,
  onChange,
  onValid,
  errors,
}) {
  // 공백 방지
  useEffect(() => {
    let valid;
    if (formType === 'etc') {
      valid = !!(
        data.title.trim() &&
        data.host.trim() &&
        data.startDate.trim() &&
        data.endDate.trim() &&
        data.announceDate.trim() &&
        data.content.trim() &&
        data.link.trim()
      );
    } else {
      valid = !!(
        data.title.trim() &&
        data.host.trim() &&
        data.place.trim() &&
        data.startDate.trim() &&
        data.endDate.trim() &&
        data.announceDate.trim() &&
        data.content.trim() &&
        data.link.trim()
      );
    }

    onValid(valid);
  }, [
    formType,
    data.title,
    data.host,
    data.place,
    data.startDate,
    data.endDate,
    data.announceDate,
    data.content,
    data.link,
    onValid,
  ]);

  const today = new Date().toISOString().slice(0, 16);

  const checkLink = () => {
    const link = new URL(
      data.link.trim().startsWith('http')
        ? data.link.trim()
        : `https://${data.link.trim()}`
    );
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('링크가 존재하지 않습니다.');
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.section}>
        <p>제목</p>
        <TextareaAutosize
          className={`${styles.textarea} ${errors.title ? styles.error : ''}`}
          placeholder='이벤트 제목을 입력해주세요'
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        {errors.title && (
          <span className={styles.errorMessage}>{errors.title}</span>
        )}
      </div>
      <div className={styles.section}>
        {formType === 'theater' ? (
          <p>공연명</p>
        ) : formType === 'movie' ? (
          <p>영화명</p>
        ) : (
          <p>주최</p>
        )}
        <TextareaAutosize
          className={`${styles.textarea} ${errors.host ? styles.error : ''}`}
          placeholder={
            formType === 'theater'
              ? '공연명을 입력해주세요'
              : formType === 'movie'
                ? '영화명을 입력해주세요'
                : '주최사를 입력해주세요'
          }
          value={data.host}
          onChange={(e) => onChange('host', e.target.value)}
        />
        {errors.host && (
          <span className={styles.errorMessage}>{errors.host}</span>
        )}
      </div>
      {['theater', 'movie'].includes(formType) && (
        <div className={styles.section}>
          <p>장소</p>
          <TextareaAutosize
            className={`${styles.textarea} ${errors.place ? styles.error : ''}`}
            placeholder='장소를 입력해주세요'
            value={data.place}
            onChange={(e) => onChange('place', e.target.value)}
          />
          {errors.place && (
            <span className={styles.errorMessage}>{errors.place}</span>
          )}
        </div>
      )}

      <div className={styles.section}>
        <p>응모 날짜</p>
        <div>
          <div className={styles.dateSection}>
            <p>시작일</p>
            <input
              type='datetime-local'
              min={today}
              value={eventTime(data.startDate)}
              onChange={(e) => onChange('startDate', e.target.value)}
              className={`${styles.dateInput} ${errors.startDate ? styles.error : ''}`}
            />
            {errors.startDate && (
              <span className={styles.errorMessage}>{errors.startDate}</span>
            )}
          </div>

          <div className={styles.dateSection}>
            <p>종료일</p>
            <input
              type='datetime-local'
              min={data.startDate || today}
              value={eventTime(data.endDate)}
              onChange={(e) => onChange('endDate', e.target.value)}
              className={`${styles.dateInput} ${errors.endDate ? styles.error : ''}`}
            />
            {errors.endDate && (
              <span className={styles.errorMessage}>{errors.endDate}</span>
            )}
          </div>
          <hr className={styles.divider} />
          <div className={styles.dateSection}>
            <p>
              {' '}
              당첨자
              <br />
              발표일
            </p>
            <input
              type='datetime-local'
              min={data.endDate || today}
              value={eventTime(data.announceDate)}
              onChange={(e) => onChange('announceDate', e.target.value)}
              className={`${styles.dateInput} ${errors.announceDate ? styles.error : ''}`}
            />
            {errors.announceDate && (
              <span className={styles.errorMessage}>{errors.announceDate}</span>
            )}
          </div>
        </div>
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
      <div className={styles.section}>
        <p>상세 설명</p>
        <TextareaAutosize
          className={`${styles.textarea} ${styles.contentArea} ${errors.content ? styles.error : ''}`}
          placeholder='이벤트에 관한 상세 설명을 입력해주세요'
          value={data.content}
          onChange={(e) => onChange('content', e.target.value)}
        />
        {errors.content && (
          <span className={styles.errorMessage}>{errors.content}</span>
        )}
      </div>
      <div className={styles.section}>
        <p>연계 링크</p>
        <div className={styles.linkArea}>
          <TextareaAutosize
            className={`${styles.textarea} ${errors.link ? styles.error : ''}`}
            placeholder={
              ['theater', 'movie'].includes(formType)
                ? '추첨 구글폼을 넣어주세요'
                : '관련 링크를 넣어주세요'
            }
            value={data.link}
            onChange={(e) => onChange('link', e.target.value)}
          />
          {errors.link && (
            <span className={styles.errorMessage}>{errors.link}</span>
          )}

          <PrimaryButton className={styles.button} onClick={checkLink}>
            확인
          </PrimaryButton>
        </div>
      </div>

      <div className={styles.image}>
        <p>이미지</p>
      </div>
    </div>
  );
}
