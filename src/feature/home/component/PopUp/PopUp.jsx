import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import aprilCalendar from '@/feature/home/component/PopUp/april-calendar.png';
import styles from './PopUp.module.css';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>
      <Heading>1. 4월 스노로즈 캘린더</Heading>

      <Content>
        <img src={aprilCalendar} alt='4월 달력' />
      </Content>

      <Heading>2. 25-1 중간고사 포인트 미지급 기간 운영 공지</Heading>
      <Content>
        - 첫눈온방 및 함박눈방에 게시글, 댓글 작성 포인트가 지급되지 않습니다.
        <br />
        - 기간: 2025/04/15(화) 00:00 ~ 2025/04/28(월) 23:59
        <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://snorose.com/board/notice/post/1811569'
        >
          관련 공지
        </a>
        를 참고해주시길 바랍니다.
      </Content>

      <Heading>3. 25-1 시험후기 게시판 운영 공지</Heading>
      <Content>
        - 시험후기 게시판 운영 기간: 2025/04/29(화)00:00 ~ 2025/05/05(월) 23:59
        <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://snorose.com/board/notice/post/1811569'
        >
          관련 공지
        </a>
        를 참고해주시길 바랍니다.
      </Content>

      <Heading>4. 족보 공유 관련 규정 개정 안내</Heading>
      <Content>
        ✓ 족보를 공유한 경우 → <strong>영구 강등</strong>{' '}
        <span style={{ color: 'red' }}>(기존과 동일)</span>
        <br />
        ✓ 족보를 공유받은 경우  
        <br />{' '}
        <span style={{ paddingLeft: '18px' }}>
          A. 금전 거래가 있었거나 시도한 경우 → <strong>영구 강등</strong>
        </span>
        <br />
        <span style={{ paddingLeft: '20px' }}>
          B. A항이 아닌 경우 → <strong>2년 강등</strong>
        </span>
        <br />
        (※ 단, 새내기는 입학년도 4월 이전 위반 시 6개월 강등, 4월부터는 2년 강등
        적용)
        <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://snorose.com/board/exam-review-notice/post/1811681'
        >
          관련 공지
        </a>
        를 참고해주시길 바랍니다.
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
