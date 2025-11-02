import { useEffect } from 'react';
import { validateRequiredFields } from '@/feature/event/lib';
import { eventTime } from '@/shared/lib';
import { TextField, DateField } from '@/feature/event/component';
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
      <div className={styles.section}>
        <p>제목</p>
        <TextField
          label='제목'
          name='title'
          value={data.title}
          placeholder='이벤트 제목을 입력해주세요'
          onChange={onChange}
          error={errors.title}
        />
      </div>

      <div className={styles.section}>
        <p>
          {formType === 'theater'
            ? '공연명'
            : formType === 'movie'
              ? '영화명'
              : '주최'}
        </p>
      </div>
      <TextField
        label='호스트'
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
        <div className={styles.section}>
          <p>장소</p>
          <TextField
            label='장소'
            name='place'
            value={data.place}
            placeholder='장소를 입력해주세요'
            onChange={onChange}
            error={errors.place}
          />
        </div>
      )}

      {/* 날짜 그룹 */}
      <p>응모 날짜</p>
      <DateField
        label='시작일'
        name='startAt'
        type='datetime-local'
        value={eventTime(data.startAt)}
        min={today}
        onChange={onChange}
        error={errors.startAt}
      />
      <DateField
        label='종료일'
        name='endAt'
        type='datetime-local'
        value={eventTime(data.endAt)}
        min={data.startAt || today}
        onChange={onChange}
        error={errors.endAt}
      />
      <hr className={styles.divider} />
      <DateField
        label='당첨자 발표일'
        name='announceAt'
        type='datetime-local'
        value={eventTime(data.announceAt)}
        min={data.endAt || today}
        onChange={onChange}
        error={errors.announceAt}
      />

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

      <div className={styles.section}>
        <p>상세 설명</p>
        <TextField
          label='상세 설명'
          name='content'
          value={data.content}
          placeholder='이벤트 추첨 방식, 유의사항 등 상세한 설명을 입력해주세요'
          onChange={onChange}
          error={errors.content}
        />
      </div>

      <div className={styles.section}>
        <p>연계 링크</p>
        <TextField
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
