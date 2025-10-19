import { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './EventForm.module.css';
import { eventTime } from '@/shared/lib';
import { PrimaryButton } from '@/shared/component';
import { useToast } from '@/shared/hook';
import { TOAST } from '@/shared/constant';
import { isUrlValid, validateRequiredFields } from '@/feature/event/lib';

export default function EventForm({
  formType,
  data,
  onChange,
  onValid,
  errors,
}) {
  const { toast } = useToast();
  // 공백 방지
  useEffect(() => {
    onValid(validateRequiredFields(formType, data, errors));
  }, [formType, data, errors, onValid]);

  const today = new Date().toISOString().slice(0, 16);

  const handleCheckLink = () => {
    if (!data.link.trim()) {
      toast({ message: TOAST.EVENT.EMPTY, variant: 'error' });
      return;
    }
    if (!isUrlValid(data.link, { open: true })) {
      toast({ message: TOAST.EVENT.FAIL, variant: 'error' });
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
              value={eventTime(data.startAt)}
              onChange={(e) => onChange('startAt', e.target.value)}
              className={`${styles.dateInput} ${errors.startAt ? styles.error : ''}`}
            />
          </div>
          {errors.startAt && (
            <span className={styles.errorMessage}>{errors.startAt}</span>
          )}

          <div className={styles.dateSection}>
            <p>종료일</p>
            <input
              type='datetime-local'
              min={data.startAt || today}
              value={eventTime(data.endAt)}
              onChange={(e) => onChange('endAt', e.target.value)}
              className={`${styles.dateInput} ${errors.endAt ? styles.error : ''}`}
            />
          </div>
          {errors.endAt && (
            <span className={styles.errorMessage}>{errors.endAt}</span>
          )}
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
              min={data.endAt || today}
              value={eventTime(data.announceAt)}
              onChange={(e) => onChange('announceAt', e.target.value)}
              className={`${styles.dateInput} ${errors.announceAt ? styles.error : ''}`}
            />
          </div>
          {errors.announceAt && (
            <span className={styles.errorMessage}>{errors.announceAt}</span>
          )}
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
          <PrimaryButton className={styles.button} onClick={handleCheckLink}>
            미리
            <br />
            보기
          </PrimaryButton>
        </div>
        {errors.link && (
          <span className={styles.errorMessage}>{errors.link}</span>
        )}
      </div>

      {/* <div className={styles.image}>
        <p>이미지</p>
      </div> */}
    </div>
  );
}
