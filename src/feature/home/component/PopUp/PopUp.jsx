import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import styles from './PopUp.module.css';
import askUsAnything from './askUsAnything.jpg';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>
      <Heading>1. 스노로즈 블로그 운영관리편 공개</Heading>
      <Content>
        <strong>&lt;스노로즈 리뉴얼&gt; 운영관리편</strong>이 업로드되었습니다.
        <br />
        지금{' '}
        <a
          className={styles.link}
          href='https://snorose.notion.site/1e57ef0aa3bf80809d79c8ab544301b4?v=1e57ef0aa3bf81daa299000c4e65257c'
          alt='스노로즈 블로그'
        >
          스노로즈 블로그
        </a>
        에서 확인해보세요!
      </Content>

      <Heading>2. 스노로즈 무물 이벤트</Heading>
      <Content>
        스노로즈에 대한 학우 여러분의 <strong>궁금증</strong>을 풀어드릴 수 있는
        이벤트를 준비했습니다.
        <br />
        평소에 스노로즈에게 궁금했던 점, 하고 싶었던 이야기, 혹은 바라는 점까지!
        익명으로 자유롭게 물어보실 수 있어요.
        <br />
        <br />
        💛 이벤트 기간: 7/14(월) ~ 7/20(일) <br />
        💛 참여 방법:{' '}
        <a
          className={styles.link}
          href='https://forms.gle/AFyphXwP5TGcGuKc7'
          alt='구글폼'
        >
          구글폼
        </a>{' '}
        제출
        <br />
        💛 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://www.snorose.com/board/notice/post/1838687'
          alt='관련 공지'
        >
          관련 공지
        </a>
        를 참고해주시길 바랍니다.
        <br />
        <br />
        <img src={askUsAnything} alt='무물 카드뉴스' />
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
