import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFindPw } from '@/apis';

import { FetchLoadingOverlay, Input, Submit } from '@/shared/component';
import { Icon } from '@/shared/component';

import {
  checkIfEntered,
  checkMail,
} from '@/pages/LoginPage/FindIdPage/inputCheck.js';

import styles from './FindPwPage.module.css';

import { LOADING_MESSAGE } from '@/constants';

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
  const submitState = () => {
    if (idStyle === 'right' && emailStyle === 'right') return 'right';
    else if (idStyle === 'wrong' || emailStyle === 'wrong') return 'wrong';
    else return 'ready';
  };

  return (
    <div className={styles.pageFrame}>
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
            <Icon
              className={styles.back}
              id='arrow-left'
              width={19}
              height={17}
              onClick={() => {
                //BackAppBar 사용 불가 -> 로그인페이지에서 findId/findPw했다가 다시 돌아오면 다시는 main으로 못 돌아가는 루프구조가 되어버림
                navigate('/login');
              }}
            />
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
                />
              </div>
            ))}

            <div className={styles.alert}>
              <ul>
                <li>
                  기존 이메일을 알 수 없는 경우, "아이디 찾기" 기능을 통해
                  확인할 수 있습니다.
                </li>
                <li>
                  "아이디 찾기"에서 이름과 학번을 입력하면, “다음 이메일로
                  아이디를 전달했습니다.
                  [snorose@snorose.com](mailto:snorose@snorose.com)”라는 안내를
                  통해 이메일 주소를 확인할 수 있습니다.
                </li>
                <li>
                  만약 이메일이 존재하지 않거나 유효하지 않을 경우,{' '}
                  <strong>아래 구글 폼</strong>을 작성해주시기 바랍니다.
                  <br />
                  <a href='https://forms.gle/PDmKuPUuUzKXTh8BA'>구글폼 링크</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.buttonFrame}>
          <Submit btnName='완료' className={submitState()} />
          <Link to='/find-id'>
            <div className={styles.findIDButton}>
              <p>아이디 찾기</p>
              <Icon id='angle-right' width={24} height={24} />
            </div>
          </Link>
        </div>
      </form>
      {loading && <FetchLoadingOverlay text={LOADING_MESSAGE.default} />}
    </div>
  );
}
