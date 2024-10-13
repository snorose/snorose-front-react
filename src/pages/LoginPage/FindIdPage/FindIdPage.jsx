import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFindId } from '@/apis';

import { Input } from '@/components/Input';
import { Submit } from '@/components/Submit';
import { FetchLoadingOverlay } from '@/components/Loading';
import { LOADING_MESSAGE } from '@/constants';

import {
  checkName,
  checkStudentNum,
} from '@/pages/LoginPage/FindIdPage/inputCheck.js';

import styles from './FindIdPage.module.css';
import { BackAppBar } from '@/components/index.js';

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
            <BackAppBar />
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
