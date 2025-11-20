import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import styles from './PopUp.module.css';
// import calendar from './calendar.png';
// import accounting from './accounting.png';
import eventLectureImage from './event_lecture.png';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>

      {/* <Heading>
        스노로즈 제1회 특별 초청강연 | 동문 ‘유트루’ 강연 신청 안내 🎤✨
      </Heading>
      <Content>
        <p>
          📌 신청 기간: ~ 11월 19일(수) 17:00 <br />
          📌 강연 일시: 11월 19일(수) 18:00 ~ 20:00 <br />
          📌 참여 신청: {''}
          <a
            href='https://forms.gle/zb7wCTtH6BZEDvZA9'
            target='_blank'
            rel='noopener noreferrer'
            alt='신청 폼'
            style={{
              color: '#007bff',
              // fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            구글 신청 폼 바로가기
          </a>{' '}
          <br />
          <br />
          📢 자세한 내용은 스노로즈{' '}
          <a
            href='https://www.snorose.com/board/notice/post/1859489'
            target='_blank'
            rel='noopener noreferrer'
            alt='스노로즈 공지사항'
            style={{
              color: '#007bff',
              // fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            공지사항
          </a>
          을 확인해주세요!
        </p>
        <img src={eventLectureImage} alt='초청강연 이벤트' />
      </Content> */}

      {/* <Heading>11월 스노로즈 일정</Heading>
      <Content>
        <img src={calendar} alt='캘린더' />
      </Content> */}

      <Heading>1. 스노로즈 &lt;이벤트 게시판&gt; 런칭 안내</Heading>
      <Content>
        이벤트 게시판이 새롭게 오픈되었습니다! <br />
        <strong>[게시판 &gt; 스노로즈 이벤트]</strong>에서 새롭게 단장한 이벤트
        게시판을 확인해 보세요!
        <br />
        👉 자세한 내용은{' '}
        <strong>
          <a
            className={styles.link}
            href='https://www.snorose.com/board/notice/post/1863135'
            alt='스노로즈 이벤트 게시판 런칭 안내'
          >
            관련 공지
          </a>
        </strong>
        를 참고해 주세요.
      </Content>

      <Heading>
        2. 스노로즈 블로그 &lt;스노로즈 리뉴얼&gt; 프론트엔드 파트편 공개
      </Heading>
      <Content>
        어떤 <strong>기술 스택과 협업 방식</strong>으로 개발해 왔는지, 그리고 그
        과정에서 어떤 <strong>고민과 선택</strong>을 해왔는지 담은{' '}
        <strong>프론트엔드 이야기</strong>를 전합니다. <br />
        👉 자세한 내용은{' '}
        <strong>
          <a
            className={styles.link}
            href='https://snorose.notion.site/CSS-2ad7ef0aa3bf80ab9df5dcc90b588b79'
            alt='스노로즈 블로그'
          >
            스노로즈 블로그
          </a>
        </strong>
        에서 확인하실 수 있어요. <br />
      </Content>

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
        {/* ※ 스노로즈 인스타그램(@snorose1906)에서 월별 스노로즈 일정을 쉽게 확인할
        수 있습니다.
        <br /> */}
        ※ 공식 문의 창구 (
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
