import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import financialReport from '@/feature/home/component/PopUp/financial-report.png';
import fundraisingEvent from '@/feature/home/component/PopUp/fundraising-event.jpg';
import styles from './PopUp.module.css';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>

      <Heading>1. 4월 회계 보고</Heading>

      <Content>
        -{' '}
        <a
          className={styles.link}
          href='https://docs.google.com/spreadsheets/u/0/d/1MzXAHemKqPwVj3PzPJch5cR5z49gFtzABPgJ_FVjCXM/edit?usp=sharing&pli=1&authuser=0'
        >
          [스노로즈 회계 보고 링크 바로가기]
        </a>
        <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://snorose.com/board/notice/post/1807846'
        >
          [관련 공지]
        </a>
        를 참고해주시길 바랍니다.
        <img src={financialReport} alt='4월 회계 보고' />
      </Content>

      <Heading>2. 1차 후원금 모집 이벤트 진행상황</Heading>

      <Content>
        - 일정 기간동안 목표 모금액을 달성하는 경우, 모든 스노로즈 정회원들께
        보상 포인트를 지급해 드리는 이벤트입니다. <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://www.snorose.com/board/notice/post/1819262'
        >
          [관련 공지]
        </a>
        를 참고해주시길 바랍니다. <br />
        <br />
        <strong>[ 1차 후원금 모금 이벤트 ]</strong>
        <br />
        📌 기간 : 25.05.01(목) ~ 25.05.31(토) <br />
        📌 목표 모금액 : 1,000,000원 <br />
        📌 보상 포인트 : 50 point <br />
        📌 모금 계좌 : 카카오뱅크 3333-31-8162062 (예금주 : 김*지)
        <img src={fundraisingEvent} alt='4월 회계 보고' />
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
