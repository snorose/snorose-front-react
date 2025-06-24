import { useState } from 'react';

import { usePopUp } from '@/feature/home/hook';
import likeRewardsTable from '@/feature/home/component/PopUp/like-rewards.png';
import styles from './PopUp.module.css';

const content = (
  <div className={styles.notice}>
    <div>
      {/* <p className={styles.hello}>
        ❄️ 안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다. ❄️
      </p> */}

      <Heading>['좋아요' 포인트 지급 기준 변경 안내]</Heading>
      <Content>
        스노로즈 내 <strong>유익한 글 작성</strong>과{' '}
        <strong>건강한 소통</strong>을 활성화하기 위해,
        <br />
        <strong>‘좋아요’ 포인트 지급 기준</strong>이 아래와 같이{' '}
        <strong>변경</strong>되었음을 안내드립니다.
        <br />
        <br />
        해당 변경 사항은 <strong>2025년 6월 25일부터 적용</strong>될 예정입니다.
        <br />
        앞으로도 스노로즈에 많은 관심과 활발한 참여 부탁드립니다.
        <br />
        <br />
        <img src={likeRewardsTable} alt='좋아요 수 리워드 변경' />
        <br />※ 좋아요 10개 달성 시, 베숙트 등재 및 하루 최대 3회 지급 조건은
        기존과 동일하게 유지됩니다.
        <br />
        <br />- 자세한 내용은{' '}
        <a
          className={styles.link}
          href='https://snorose.com/board/notice/post/1835541'
          alt='공지'
        >
          [관련 공지]
        </a>
        를 참고해주시길 바랍니다.
      </Content>

      {/* <Heading>
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

     */}

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
