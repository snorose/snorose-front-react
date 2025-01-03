import { useState } from 'react';

import { usePopUp } from '@/hooks/index.js';
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

      <Heading>2. 시험후기 게시판 글 작성 가능 기간</Heading>
      <Content>
        2024.12.21(토) 00:00 ~ 2025.01.20(월) 23:59
        <br />
        <Content>
          <span className={styles.strong}>
            * 시험후기 게시 전{' '}
            <span className={styles.underline}>공지사항</span> 꼭!
            확인부탁드립니다.
          </span>
          <Content>
            시험후기 공지사항:{' '}
            <a
              className={styles.link}
              href='https://www.snorose.com/board/exam-review-notice/post/1722602'
            >
              https://www.snorose.com/board/exam-review-notice/post/1722602
            </a>
          </Content>
        </Content>
      </Content>
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

export default function PopUp() {
  const [popupHideDuration, setPopupHideDuration] = useState();
  const updatePopupHideDuration = (event) => {
    const { value } = event.target;
    setPopupHideDuration(Number(value));
  };

  const { isPopUpOpend, closePopUp } = usePopUp();
  const close = () => closePopUp({ popupHideDuration });

  if (!isPopUpOpend) {
    return null;
  }

  return (
    <section className={styles.container}>
      <div className={styles.popUp}>
        <div className={styles.top}>
          <pre>{content}</pre>
        </div>
        <div className={styles.bottom}>
          <div className={styles.radios} onChange={updatePopupHideDuration}>
            <label className={styles.radio}>
              <input type='radio' value={0} name='hideDuration' />
              <span>오늘 하루 보지 않기</span>
            </label>
            <label className={styles.radio}>
              <input type='radio' value={2} name='hideDuration' />
              <span>3일간 보지 않기</span>
            </label>
          </div>
          <button onClick={close}>닫기</button>
        </div>
      </div>
    </section>
  );
}
