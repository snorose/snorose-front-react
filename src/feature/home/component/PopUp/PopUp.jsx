import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';

import styles from './PopUp.module.css';

const content = (
  <div className={styles.notice}>
    <div>
      <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p>
      <Heading>1. 새내기 웰컴 이벤트</Heading>

      <SubHeading>event 1) 새송이 웰컴 미션 챌린지</SubHeading>
      <Content>
        7일 연속 출석체크하고 인증샷을 남기면, 스노로즈 포인트와 함께 추첨을
        통해 소정의 선물을 드립니다.
        <br />
        인스타그램 스토리를 함께 올려주시면 추가 포인트도 지급해 드려요.
        <br />- 구글폼:{' '}
        <a className={styles.link} href='https://forms.gle/HzS3kca4kPPVFCZi8'>
          https://forms.gle/HzS3kca4kPPVFCZi8
        </a>
      </Content>

      <SubHeading>event 2) 첫눈온방 '스노로즈' 4행시 이벤트</SubHeading>
      <Content>
        일주일 동안 가장 많은 '좋아요'를 받은 새송이에게 포인트를 지급해 드려요.
      </Content>

      <SubHeading>event 3) 학과 선배송이와 새송이의 1:2 데이트</SubHeading>
      <Content>
        학과 선배들에게 대학 생활 꿀팁을 전수받고 싶다면, 구글 폼을 통해 신청해
        주세요. <br />- 구글폼:{' '}
        <a className={styles.link} href='https://forms.gle/WfzxBPQx4xFnAnns5'>
          https://forms.gle/WfzxBPQx4xFnAnns5
        </a>
      </Content>

      <Content>
        - 이벤트 기간: 이벤트별 상이 <br />- 관련 게시글:{' '}
        <a
          className={styles.link}
          href='https://www.snorose.com/board/first-snow/post/1788353'
        >
          https://www.snorose.com/board/first-snow/post/1788353
        </a>
      </Content>

      <Heading>2. 재학생 꿀팁 이벤트</Heading>

      <SubHeading>event 1) 선배송이 꿀팁 전수 이벤트</SubHeading>
      <Content>
        '함박눈방'에 학교 생활 꿀팁들을 태그(#전공 #맛집)와 함께 공유해 주세요.
      </Content>

      <Content>
        - 이벤트 기간: 2025.02.17(월) ~ 2025.03.31(월) 23:59 <br />- 관련
        게시글:{' '}
        <a
          className={styles.link}
          href='https://snorose.com/board/large-snow/post/1788355'
        >
          https://snorose.com/board/large-snow/post/1788355
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
