import { useState } from 'react';

import styles from './PopUp.module.css';

const CONTENT = `공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
공지 내용입니다.
`;

export default function PopUp({ close }) {
  const [closeForToday, setCloseForToday] = useState(false);
  const toggleCloseForToday = (event) => setCloseForToday(event.target.checked);
  const closePopUp = () => close({ closeForToday });

  return (
    <section className={styles.container}>
      <div className={styles.popUp}>
        <div className={styles.top}>
          <pre>{CONTENT}</pre>
        </div>
        <div className={styles.bottom}>
          <label className={styles.checkBox}>
            <input
              type='checkbox'
              checked={closeForToday}
              onChange={toggleCloseForToday}
            />
            <span>오늘 하루 보지 않기</span>
          </label>
          <button onClick={closePopUp}>닫기</button>
        </div>
      </div>
    </section>
  );
}
