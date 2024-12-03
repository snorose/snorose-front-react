import { useState } from 'react';

import styles from './PopUp.module.css';

const CONTENT = (
  <>
    <p className={styles.hello}>
      ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
    </p>

    <h2 className={styles.title}>1. 24-2 기말고사 포인트 미지급 기간</h2>
    <p className={styles.content}>12.02(월) 00:00 ~ 12.20(금) 23:59</p>

    <h2 className={styles.title}>2. 시험후기 게시판 운영 기간</h2>
    <p className={styles.content}>12.21(토) 00:00 ~ 2025.01.20(월) 23:59</p>

    <h2 className={styles.title}>3. 리뉴얼 사이트 만족도 조사 안내</h2>
    <p className={styles.content}>
      {`리뉴얼 오픈 1개월을 맞이하여 스노로즈 이용자를 대상으로 종합적인 만족도 조사를 진행하고자 합니다. 스노로즈의 발전을 위한 숙명인 여러분의 소중한 의견을 기다리고 있겠습니다.\n\n`}
      <li>
        설문지 링크:{' '}
        <a className={styles.link} href='https://forms.gle/x6j8SRujTdKbXhk88'>
          https://forms.gle/x6j8SRujTdKbXhk88
        </a>
      </li>
      <li>설문 기간: 2024.11.12(화) ~ 2024.12.12(목)</li>
    </p>

    <hr />
    <p className={styles.content}>
      ※공식 문의 창구 (이메일(snorose1906@gmail.com), 카카오톡 1:1 문의) 이외의
      문의는 받고 있지 않습니다. 공식 문의 창구 이외의 문의 글은 답변 없이
      삭제될 수 있음을 알려드립니다.
    </p>
  </>
);

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
