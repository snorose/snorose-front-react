import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import InnisfreeEventImage from '@/feature/home/component/PopUp/event-innisfree.png';
import styles from './PopUp.module.css';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>
      <Heading>
        스노로즈X이니스프리 비타민C 7일 톤업 키트 샘플링 이벤트 🎁✨
      </Heading>

      <Content>
        <img src={InnisfreeEventImage} alt='스노로즈X이니스프리 이벤트' />
      </Content>
      <Content>
        봄철 칙칙한 피부 톤, 환하게 케어하세요!
        <br />
        이니스프리 비타민C 7일 톤업 키트 체험 기회가 찾아왔습니다.
        <br />
        맑고 생기 넘치는 피부로 가꿔줄 비타민C의 힘을 느껴보세요!
      </Content>

      <SubHeading>🌞 체험단 제품 구성</SubHeading>
      <Content>
        - 비타민C 7일 톤업 세럼
        <br />
        - 비타민C 캡슐 수분 크림
        <br />
        - 비타민C 잡티 톤업 선
        <br />
      </Content>

      <SubHeading>✅ 대상</SubHeading>
      <Content>
        - 스노로즈 가입자 중 숙명여자대학교 재학생, 휴학생, 졸업생
      </Content>

      <SubHeading>📆 신청 기간</SubHeading>
      <Content>- 3월 24일(월) ~ 3월 31일(월)</Content>

      <SubHeading>🔗 자세한 내용</SubHeading>
      <Content>
        <a
          className={styles.link}
          href='https://www.snorose.com/board/notice/post/1802411
          '
        >
          https://www.snorose.com/board/notice/post/1802411
        </a>
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
