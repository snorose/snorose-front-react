import { useEffect } from 'react';
import { validateRequiredFields } from '@/feature/event/lib';
import { eventTime } from '@/shared/lib';
import { FormField } from '@/feature/event/component';
import styles from './EventForm.module.css';

export default function EventForm({
  formType,
  data,
  onChange,
  onValid,
  errors,
}) {
  const today = new Date().toISOString().slice(0, 16);

  useEffect(() => {
    onValid(validateRequiredFields(formType, data, errors));
  }, [formType, data, errors, onValid]);

  return (
    <div className={styles.form}>
      <FormField
        label='제목'
        name='title'
        value={data.title}
        placeholder='이벤트 제목을 입력해주세요'
        onChange={onChange}
        error={errors.title}
      />

      <FormField
        label={
          formType === 'theater'
            ? '공연명'
            : formType === 'movie'
              ? '영화명'
              : '주최'
        }
        name='host'
        value={data.host}
        placeholder={
          formType === 'theater'
            ? '공연명을 입력해주세요'
            : formType === 'movie'
              ? '영화명을 입력해주세요'
              : '주최사를 입력해주세요'
        }
        onChange={onChange}
        error={errors.host}
      />

      {['theater', 'movie'].includes(formType) && (
        <FormField
          label='장소'
          name='place'
          value={data.place}
          placeholder='장소를 입력해주세요'
          onChange={onChange}
          error={errors.place}
        />
      )}

      {/* 날짜 그룹 */}
      <div className={styles.section}>
        <p>응모 날짜</p>
        <FormField
          label='시작일'
          name='startAt'
          type='datetime-local'
          value={eventTime(data.startAt)}
          min={today}
          onChange={onChange}
          error={errors.startAt}
        />
        <FormField
          label='종료일'
          name='endAt'
          type='datetime-local'
          value={eventTime(data.endAt)}
          min={data.startAt || today}
          onChange={onChange}
          error={errors.endAt}
        />
        <FormField
          label='당첨자 발표일'
          name='announceAt'
          type='datetime-local'
          value={eventTime(data.announceAt)}
          min={data.endAt || today}
          onChange={onChange}
          error={errors.announceAt}
        />
      </div>

      {/* 추첨 인원 */}
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

      <FormField
        label='상세 설명'
        name='content'
        value={data.content}
        placeholder='이벤트 상세 내용을 입력해주세요'
        onChange={onChange}
        error={errors.content}
      />

      <div className={styles.linkField}>
        <FormField
          label='연계 링크'
          name='link'
          value={data.link}
          placeholder={
            ['theater', 'movie'].includes(formType)
              ? '추첨 구글폼을 넣어주세요'
              : '관련 링크를 넣어주세요'
          }
          onChange={onChange}
          error={errors.link}
          data={data}
        />
      </div>
    </div>
  );
}
