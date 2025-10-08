import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import styles from './PopUp.module.css';
import october from './october.png';
import accounting from './accounting.png';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>

      <Heading>1. 스노로즈 알림 기능 런칭 안내</Heading>
      <Content>
        <strong>10월 6일(월)</strong>부터 스노로즈에서{' '}
        <strong>알림 기능</strong>을 제공합니다.
        <br />
        알림 기능 소개 및 사용 방법은{' '}
        <strong>
          <a
            className={styles.link}
            href='http://localhost:3001/board/notice/post/1854049'
            target='_blank'
            alt='스노로즈 알림 기능 런칭 안내'
          >
            관련 공지
          </a>
        </strong>{' '}
        를 참고해주시길 바랍니다.
      </Content>

      <Heading>2. 청파제 이벤트 포인트 지급 일정 안내</Heading>
      <Content>
        <p>
          청파제 이벤트 포인트는 <strong>10월 13일(월)</strong>까지 순차적으로
          지급될 예정입니다.
        </p>
      </Content>

      <Heading>3. 10월 스노로즈 일정</Heading>
      <Content>
        <img src={october} alt='10월 캘린더' />
      </Content>

      {/* <Heading>2. 스노로즈 블로그 이벤트기획파트편 공개</Heading>
      <Content>
        <strong>&lt;스노로즈 리뉴얼&gt; 이벤트기획파트편</strong>이
        업로드되었습니다.
        <br />
        지금{' '}
        <strong>
          <a
            className={styles.link}
            href='https://snorose.notion.site/2677ef0aa3bf80a4910afcf464b4ead2'
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
