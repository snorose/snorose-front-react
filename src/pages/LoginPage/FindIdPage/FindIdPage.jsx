import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFindId } from '@/apis';

import { Input, Submit } from '@/shared/component';
import { Icon } from '@/components/Icon';

import { FetchLoadingOverlay } from '@/components/Loading';
import { LOADING_MESSAGE } from '@/constants';

import {
  checkName,
  checkStudentNum,
} from '@/pages/LoginPage/FindIdPage/inputCheck.js';

import styles from './FindIdPage.module.css';

export default function FindIdPage() {
  const findId = useFindId();
  const navigate = useNavigate();
  const [nameStyle, setNameStyle] = useState('ready');
  const [numberStyle, setNumberStyle] = useState('ready');
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    userName: '',
    studentNumber: '',
  });
  const inputProps = [
    [
      '이름',
      '이름을 입력해주세요',
      nameStyle,
      setNameStyle,
      checkName,
      'userName',
      '특수문자는 사용할 수 없습니다',
    ],
    [
      '학번',
      '학번을 입력해주세요',
      numberStyle,
      setNumberStyle,
      checkStudentNum,
      'studentNumber',
      '학번 형식이 옳지 않습니다',
    ],
  ];
  const submitState = () => {
    if (nameStyle === 'right' && numberStyle === 'right') return 'right';
    else if (nameStyle === 'wrong' || numberStyle === 'wrong') return 'wrong';
    else return 'ready';
  };

  return (
    <div className={styles.pageFrame}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (formData.userName && formData.studentNumber && allowSubmit) {
            findId(e, formData, navigate, setLoading);
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
            <h1 className={styles.pageTitle}>아이디 찾기</h1>

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
              <ol>
                <li>
                  1) 아이디 찾기를 해도 입력한 정보와 일치하는 정보가 없다고
                  뜹니다.
                </li>
                <li>
                  2) 마이페이지에서 학번이 ‘학번+숫자’형식입니다. 변경하고
                  싶어요.
                  <br />
                </li>
                <strong>
                  → 구 스노로즈에 저장된 학번이 아래와 같은 경우, 데이터
                  정합성을 위하여 임의로 학번+숫자 형식으로 모두 수정되었습니다.
                </strong>
                <br />
                <br />
                <li>
                  1) 가입 시 입력한 학번이 정확하지 않은 경우(ex 111111111111,
                  00000000000 등)
                </li>
                <li>
                  2) 다른 유저가 같은 학번으로 입학한 경우
                  <br />
                  <strong>
                    → 하나의 학번 당 한 유저만 가입 가능하므로 리자가 임의로
                    다른 학번으로 바꿨습니다.
                  </strong>
                </li>
                <br />
                <li>
                  따라서 위의 경우에 해당하시는 분과 학번이 잘못되어 수정을
                  원하시는 분들은, <strong>아래 구글 폼</strong>을 통해
                  <br />
                  <strong>학번 변경 문의</strong>를 남겨주시면
                  해결해드리겠습니다.
                  <br />
                  <a href='https://forms.gle/xwi7q47Dz59UNeEW7'>구글폼 링크</a>
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.buttonFrame}>
            <Submit btnName='다음으로' className={submitState()} />
          </div>
        </div>
      </form>
      {loading && <FetchLoadingOverlay text={LOADING_MESSAGE.default} />}
    </div>
  );
}
