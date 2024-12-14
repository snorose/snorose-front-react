import { useState } from 'react';

import { Heading, Content } from '@/components/PopUp/Component.jsx';

import styles from './PopUp.module.css';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>
      <Heading>1. 24-2 기말고사 포인트 미지급 기간</Heading>
      <Content>12.02(월) 00:00 ~ 12.20(금) 23:59</Content>

      <Heading>2. 시험후기 게시판 운영 기간</Heading>
      <Content>12.21(토) 00:00 ~ 2025.01.20(월) 23:59</Content>
    </div>
    <div>
      <hr />
      <Content>
        ※공식 문의 창구 (이메일(snorose1906@gmail.com), 카카오톡 1:1 문의)
        이외의 문의는 받고 있지 않습니다. 공식 문의 창구 이외의 문의 글은 답변
        없이 삭제될 수 있음을 알려드립니다.
      </Content>
    </div>
  </div>
);

export default function PopUp({ close }) {
  const [closeForToday, setCloseForToday] = useState(false);
  const toggleCloseForToday = (event) => setCloseForToday(event.target.checked);
  const closePopUp = () => close({ closeForToday });

  return (
    <section className={styles.container}>
      <div className={styles.popUp}>
        <div className={styles.top}>
          <pre>{content}</pre>
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
