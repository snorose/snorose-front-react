import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import accountingReport from '@/feature/home/component/PopUp/accountingReport.png';
import styles from './PopUp.module.css';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>

      <Heading>
        1. 포인트 미지급 일시적 해제 오류에 따른 포인트 회수 조치 안내
      </Heading>

      <Content>
        - 포인트 미지급 기간인 6월 7일 0시 ~ 6월 8일 20시 사이 시스템 오류로
        잘못 지급된 글/댓글 포인트가 모두 회수되었습니다. <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://www.snorose.com/board/notice/post/1835262'
          alt='공지'
        >
          [관련 공지]
        </a>
        를 참고 부탁드립니다.
      </Content>

      <Heading>
        2. iOS 일부 기기 및 브라우저에서 스노로즈 접속 불가 현상 안내
      </Heading>

      <Content>
        - 현재 iOS 기기에서 네이버앱, 구글앱, 인스타그램 앱을 통한 스노로즈
        접속이 제한되는 현상이 발생하고 있습니다. <br />- 보다 원활한 이용을
        위해 크롬 또는 사파리 브라우저를 통해 접속해주시길 부탁드립니다.
        <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://www.snorose.com/board/notice/post/1835263'
          alt='공지'
        >
          [관련 공지]
        </a>
        를 참고 바랍니다.
      </Content>

      <Heading>3. 5월 회계 보고</Heading>
      <Content>
        -{' '}
        <a
          className={styles.link}
          href='https://docs.google.com/spreadsheets/u/0/d/1MzXAHemKqPwVj3PzPJch5cR5z49gFtzABPgJ_FVjCXM/edit?usp=sharing&pli=1&authuser=0'
          alt='회계 보고 링크'
        >
          [스노로즈 회계 보고 링크 바로가기]
        </a>
        <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://www.snorose.com/board/notice/post/1835239'
          alt='공지'
        >
          [관련 공지]
        </a>
        를 참고 부탁드립니다.
        <img src={accountingReport} alt='5월 회계보고' />
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
