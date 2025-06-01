import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import calendar from '@/feature/home/component/PopUp/june-calendar.png';
import styles from './PopUp.module.css';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>

      <Heading>1. 1차 후원금 모금 이벤트 마감 안내 (1,027,852원)</Heading>

      <Content>
        - 5월 31일 기준 목표 금액 100만원을 달성하며 후원금 모금 이벤트가
        성공적으로 종료되었습니다. 참여해주신 모든 숙명인분들께 진심으로
        감사드립니다💙
      </Content>

      <Heading>2. 6월 스노로즈 캘린더</Heading>

      <Content>
        <img src={calendar} alt='6월 달력' />
      </Content>

      <Heading>3. 글/댓글 포인트 미지급 기간 안내</Heading>

      <Content>
        <strong>기간: 6월 3일(화) 00:00 ~ 6월 23일(월) 23:59</strong> <br />- 위
        기간 동안 글, 댓글 포인트는 지급되지 않습니다. <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://www.snorose.com/board/notice/post/1833145'
          alt='공지'
        >
          관련 공지사항
        </a>
        를 참조 부탁드립니다.
      </Content>

      <Heading>4. 스노로즈 블로그 회계편 공개</Heading>

      <Content>
        <strong>&lt;스노로즈 리뉴얼&gt; 회계편</strong>이 업로드되었습니다.
        <br />
        지금{' '}
        <a
          className={styles.link}
          href='https://snorose.notion.site/1a37ef0aa3bf8071bcd0cb35c035636e'
          alt='블로그'
        >
          스노로즈 블로그
        </a>
        에서 확인해보세요!
        <br />
      </Content>

      <hr />
      <Content>
        ※ 스노로즈 인스타그램(@snorose1906)에서 월별 스노로즈 일정을 쉽게 확인할
        수 있습니다.
        <br />※ 공식 문의 창구 (
        <span>
          이메일(
          <a
            href='mailto:snorose1906@gmail.com'
            style={{ color: '#007bff', textDecoration: 'underline' }}
          >
            snorose1906@gmail.com
          </a>
          )
        </span>
        , 카카오톡 1:1 문의) 이외의 문의는 받고 있지 않습니다. 공식 문의 창구
        이외의 문의 글은 답변 없이 삭제될 수 있음을 알려드립니다.
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

  const { isPopUpOpened, closePopUp } = usePopUp();
  const close = () => closePopUp({ popupHideDuration });

  if (!isPopUpOpened) {
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

export function Heading({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}

export function SubHeading({ children }) {
  return <h3 className={styles.subTitle}>{children}</h3>;
}

export function Content({ children }) {
  return <p className={styles.content}>{children}</p>;
}
