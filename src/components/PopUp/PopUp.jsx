import { useState } from 'react';

import styles from './PopUp.module.css';

const CONTENT = (
  <>
    <p className={styles.hello}>
      안녕하세요. 숙명인을 위한 커뮤니티, 스노로즈입니다.
    </p>
    <h3 className={styles.title}>1. 인증 및 메일 전송 오류 안내</h3>
    <p className={styles.content}>
      회원가입 이메일 인증 메일, 로그인 및 아이디/비번찾기가 원활하지 않은
      현상은 접속자가 많아 생기는 오류로, 해당 오류가 계속 될 시 일정 시간 이후
      재시도바랍니다.
    </p>
    <h3 className={styles.title}>2. 최초 로그인 시 비밀번호 재설정 안내</h3>
    <p className={styles.content}>
      접속 후 반드시 비밀번호를 재설정한 후 로그인을 진행해주시기 바랍니다. 가입
      당시 사용한 이메일은 아이디 찾기를 통해 찾을 수 있습니다. 만일 이메일 및
      학번이 오기재 되었거나 탈퇴된 경우에는 구글 폼(
      <a className={styles.link} href='https://forms.gle/PDmKuPUuUzKXTh8BA'>
        https://forms.gle/PDmKuPUuUzKXTh8BA
      </a>
      )으로 변경 신청 부탁드립니다.
    </p>
    <h3 className={styles.title}>3. 오류 제보 방법</h3>
    <p className={styles.content}>
      사이트 내에서 오류를 발견한 경우, 통합 공지에 게시된 문의 창구를 통해
      제보해주시면 감사하겠습니다. 제보하신 분에게는 최초 신고자에 한해 10
      포인트를 드립니다.
    </p>
    <p className={styles.content}>
      ※공식 문의창구 (이메일(snorose1906@gmail.com), 카카오톡 1:1 문의) 이외의
      문의는 받고 있지 않습니다. 공식 문의 창구 이외의 문의 글은 답변 없이
      삭제될 수 있음을 알려드립니다.
    </p>
  </>
);

export default function PopUp({ close }) {
  const [closeForToday, setCloseForToday] = useState(false);
  const toggleCloseForToday = (event) => setCloseForToday(event.target.checked);
  const closePopUp = () => close({ closeForToday });

  return (
    <section className={styles.container}>
      <div className={styles.popUp}>
        <div className={styles.top}>
          <pre>{CONTENT}</pre>
        </div>
        <div className={styles.bottom}>
          <label className={styles.checkBox}>
            <input
              type='checkbox'
              checked={closeForToday}
              onChange={toggleCloseForToday}
            />
            <span>오늘 하루 보지 않기</span>
          </label>
          <button onClick={closePopUp}>닫기</button>
        </div>
      </div>
    </section>
  );
}
