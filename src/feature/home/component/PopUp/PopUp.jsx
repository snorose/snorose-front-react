import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import styles from './PopUp.module.css';
import september from './september.jpg';
import accounting from './accounting.png';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>

      <Heading>1. 9월 스노로즈 캘린더</Heading>
      <Content>
        청파제(9/17~18)에서 스노로즈 부스를 운영합니다. <br />
        학우 여러분의 많은 관심과 방문 부탁드립니다 ✨
        <br />
        <img src={september} alt='9월 캘린더' />
      </Content>

      {/* <Heading>
        1. 스노로즈 블로그 - 무엇이든 물어보세요(무물) 특별편 공개
      </Heading>
      <Content>
        <strong>&lt;스노로즈 리뉴얼&gt; 무물 특별편</strong>이 업로드되었습니다.
        <br />
        지금{' '}
        <strong>
          <a
            className={styles.link}
            href='https://snorose.notion.site/2467ef0aa3bf806e9920dc5586292898'
            alt='스노로즈 블로그'
          >
            스노로즈 블로그
          </a>
        </strong>
        에서 확인해보세요!
      </Content> */}

      {/* <Heading>2. 7월 회계 보고</Heading>
      <Content>
        -{' '}
        <strong>
          <a
            className={styles.link}
            href='https://docs.google.com/spreadsheets/u/0/d/1MzXAHemKqPwVj3PzPJch5cR5z49gFtzABPgJ_FVjCXM/edit?usp=sharing&pli=1&authuser=0'
            alt='스노로즈 회계 보고 링크 바로가기'
          >
            스노로즈 회계 보고 링크 바로가기
          </a>
        </strong>
        <br />- 자세한 내용은{' '}
        <strong>
          <a
            className={styles.link}
            href='https://www.snorose.com/board/notice/post/1840783'
            alt='공지'
          >
            관련 공지
          </a>
        </strong>
        를 참고해주시길 바랍니다.
        <img src={accounting} alt='7월 회계보고' />
      </Content> */}

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
