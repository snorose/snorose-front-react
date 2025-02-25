import { useState } from 'react';

import { Input, SpecialInput } from '@/components/Input';
import { Submit } from '@/shared/component';

import {
  checkName,
  checkSookmyungMail,
  checkID,
  checkPW,
  checkIfSame,
} from '@/pages/LoginPage/FindIdPage/inputCheck.js';

import styles from './AccountInfoPage.module.css';

export default function AccountInfoPage({ formData, setFormData, setStage }) {
  const [nameStyle, setNameStyle] = useState('ready');
  const [emailStyle, setEmailStyle] = useState('ready');
  const [idStyle, setIdStyle] = useState('ready');
  const [pwStyle, setPwStyle] = useState('ready');
  const [pw2Style, setPw2Style] = useState('ready');
  const setDoneState = () => {
    if (
      nameStyle === 'right' &&
      emailStyle === 'right' &&
      idStyle === 'right' &&
      pwStyle === 'right' &&
      pw2Style === 'right'
    )
      return 'right';
    else return 'ready';
  };
  return (
    <div className={styles.pageFrame}>
      <div className={styles.scrollFrame}>
        <p className={styles.text}>
          계정 정보를
          <br /> 입력해주세요
        </p>
        <div className={styles.inputFrame}>
          <Input
            title={'이름'}
            placeholder={'이름을 입력해주세요'}
            className={nameStyle}
            setClassName={setNameStyle}
            classNameCheck={checkName}
            inputType={'userName'}
            inputData={setFormData}
            data={formData}
            errMsg={
              '한글 또는 영어 대소문자로 2자 이상 30자 이하로 입력해주세요'
            }
          />
        </div>
        <div className={styles.inputFrame}>
          <Input
            title={'숙명 구글 이메일'}
            placeholder={'sample@sookmyung.ac.kr'}
            className={emailStyle}
            setClassName={setEmailStyle}
            classNameCheck={checkSookmyungMail}
            inputType={'email'}
            inputData={setFormData}
            data={formData}
            errMsg={'숙명 이메일만 입력 가능합니다'}
          />
        </div>
        <div className={styles.inputFrame}>
          <Input
            title={'아이디'}
            placeholder={'사용할 아이디를 입력해주세요'}
            className={idStyle}
            setClassName={setIdStyle}
            classNameCheck={checkID}
            inputType={'loginId'}
            inputData={setFormData}
            data={formData}
            errMsg={'특수문자를 제외한 5자 이상 30자 이하로 입력해주세요'}
          />
        </div>
        <div className={styles.inputFrame}>
          <SpecialInput
            title={'비밀번호'}
            placeholder={'비밀번호를 입력해주세요'}
            className={pwStyle}
            setClassName={setPwStyle}
            classNameCheck={checkPW}
            inputType={'password'}
            inputData={setFormData}
            data={formData}
            id1={'opened-eye'}
            id2={'closed-eye'}
            color1={'#898989'}
            color2={'#00368e'}
            color3={'#ff4b6c'}
            state1={'text'}
            state2={'password'}
            errMsg={
              '영어, 숫자, 특수문자(!@#%^&*)만 사용하여 8자 이상 16자 이하로 작성해주세요'
            }
          />
        </div>
        <div className={styles.inputFrame}>
          <SpecialInput
            title={'비밀번호 확인'}
            placeholder={'비밀번호를 다시 입력해주세요'}
            className={pw2Style}
            setClassName={setPw2Style}
            classNameCheck={() =>
              checkIfSame(formData.password, formData.checkedPassword)
            }
            inputType={'checkedPassword'}
            inputData={setFormData}
            data={formData}
            id1={'opened-eye'}
            id2={'closed-eye'}
            color1={'#898989'}
            color2={'#00368e'}
            color3={'#ff4b6c'}
            state1={'text'}
            state2={'password'}
            errMsg={'비밀번호가 일치하지 않습니다'}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <Submit
          btnName='다음으로'
          className={setDoneState()}
          onClick={() => setStage((prev) => prev + 1)}
        />
      </div>
    </div>
  );
}
