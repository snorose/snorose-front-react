import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFindId } from '@/apis';

import {
  FetchLoadingOverlay,
  Icon,
  Input,
  Button,
  BackAppBar,
} from '@/shared/component';
import { LOADING_MESSAGE } from '@/shared/constant';

import { checkName, checkStudentNum } from '@/feature/account/lib';

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
    <div className={styles.container}>
      <BackAppBar />

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
                  data={formData}
                />
              </div>
            ))}

            <div className={styles.alert}>
              <ol>
                <li>
                  아이디 찾기를 해도 입력한 정보와 일치하는 정보가 없다고 떠요.
                </li>
                <li>
                  마이페이지에서 학번이 ‘학번+숫자’형식이에요. 변경하고 싶어요.
                </li>
                <div className={`${styles.highlight} ${styles.alertArrow}`}>
                  → 구 스노로즈에 저장된 학번이 아래와 같은 경우,
                  <br /> 데이터 정합성을 위하여 임의로 '학번+숫자'로
                  수정되었어요.
                </div>
                <li>
                  가입 시 입력한 학번이 정확하지 않은 경우(ex 111111111111 등)
                </li>
                <li>다른 유저가 같은 학번으로 입학한 경우</li>
                <div className={`${styles.highlight} ${styles.alertArrow}`}>
                  → 하나의 학번 당 한 유저만 가입 가능하므로 리자가 임의로 다른
                  학번으로 변경했어요.
                </div>

                <div className={styles.highlight}>
                  따라서, 위의 경우에 해당하거나 학번이 잘못되어 수정이
                  필요하다면, 아래 구글 폼을 통해 학번 변경 문의를 남겨주시면
                  신속히 해결해드릴게요
                </div>
                <button className={styles.googleFormBtn}>
                  <Icon id='google-form' width={'1.6rem'} height={'1.6rem'} />
                  <a href='https://forms.gle/xwi7q47Dz59UNeEW7'>구글 폼</a>
                </button>
              </ol>
            </div>
          </div>

          <div className={styles.buttonFrame}>
            <Button btnName='다음으로' className={submitState()} />
          </div>
        </div>
      </form>
      {loading && <FetchLoadingOverlay text={LOADING_MESSAGE.default} />}
    </div>
  );
}
