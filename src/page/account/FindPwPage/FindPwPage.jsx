import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFindPw } from '@/apis';

import {
  BackAppBar,
  Button,
  FetchLoadingOverlay,
  Icon,
  Input,
} from '@/shared/component';
import { LOADING_MESSAGE } from '@/shared/constant';

import { checkIfEntered, checkMail } from '@/feature/account/lib';

import styles from './FindPwPage.module.css';

export default function FindPwPage() {
  const findPw = useFindPw();
  const navigate = useNavigate();
  const [idStyle, setIdStyle] = useState('ready');
  const [emailStyle, setEmailStyle] = useState('ready');
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    loginId: '',
    email: '',
  });
  const inputProps = [
    [
      '아이디',
      '아이디를 입력해주세요',
      idStyle,
      setIdStyle,
      checkIfEntered,
      'loginId',
      '아이디는 영어, 숫자만 가능합니다',
    ],
    [
      '이메일',
      '이메일을 입력해주세요',
      emailStyle,
      setEmailStyle,
      checkMail,
      'email',
      '이메일만 입력 가능합니다',
    ],
  ];

  return (
    <div className={styles.container}>
      <BackAppBar />

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (formData.loginId && formData.email && allowSubmit) {
            findPw(e, formData, navigate, setLoading);
            //버튼 한번만 누를 수 있게 제한하는 코드
            setAllowSubmit(false);
          }
        }}
      >
        <div className={styles.findIdFrame}>
          <div>
            <h1 className={styles.pageTitle}>비밀번호 찾기</h1>
            {inputProps.map((props, i) => (
              <div className={styles.inputFrame} key={i}>
                <Input
                  title={props[0]}
                  placeholder={props[1]}
                  className={props[2]}
                  setClassName={props[3]}
                  classNameCheck={props[4]}
                  inputType={props[5]}
                  inputData={setFormData}
                  errMsg={props[6]}
                  data={formData}
                />
              </div>
            ))}

            <div className={styles.alert}>
              <ul>
                <li>
                  기존 이메일을 알 수 없는 경우,
                  <span className={styles.highlight}> 아이디 찾기</span> 기능을
                  통해 확인할 수 있어요
                </li>
                <li>
                  <span className={styles.highlight}>아이디 찾기</span>에서
                  이름과 학번을 입력하면,
                  <br />
                  <span className={styles.highlight}>
                    다음 이메일로 아이디가 발송되었어요
                  </span>
                  라는 안내를 통해 이메일 주소를 확인할 수 있어요
                </li>
              </ul>
              <p className={styles.highlight} style={{ marginTop: '1.3rem' }}>
                만약 이메일이 존재하지 않거나 유효하지 않을 경우,
                <br />
                아래 구글 폼을 작성해주시면 신속히 해결해드릴게요.
              </p>
              <button className={styles.googleFormBtn}>
                <Icon id='google-form' width={'1.6rem'} height={'1.6rem'} />
                <a href='https://forms.gle/PDmKuPUuUzKXTh8BA'>구글 폼</a>
              </button>
            </div>
          </div>
          <div className={styles.buttonFrame}>
            <Button btnName='완료' className={'right'} />
            <Link to='/find-id'>
              <div className={styles.findIDButton}>
                <Button btnName='아이디를 잊어버렸어요' className={'ready'} />
              </div>
            </Link>
          </div>
        </div>
      </form>
      {loading && <FetchLoadingOverlay text={LOADING_MESSAGE.default} />}
    </div>
  );
}
