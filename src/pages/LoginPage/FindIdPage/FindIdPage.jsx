import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FindIdPage.module.css';
import Input from '../../../components/Input/Input';
import Submit from '../../../components/Submit/Submit';
import Icon from '../../../components/Icon/Icon';
import {
  checkSpecialChar,
  checkSookmyungMail,
  checkStudentNum,
} from './inputCheck';

export default function FindIdPage() {
  const navigate = useNavigate();
  const [nameStyle, setNameStyle] = useState('ready');
  const [emailStyle, setEmailStyle] = useState('ready');
  const [numberStyle, setNumberStyle] = useState('ready');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    studentNumber: '',
  });
  const submitState = () => {
    if (
      nameStyle === 'right' &&
      emailStyle === 'right' &&
      numberStyle === 'right'
    )
      return 'right';
    else if (
      nameStyle === 'wrong' ||
      emailStyle === 'wrong' ||
      numberStyle === 'wrong'
    )
      return 'wrong';
    else return 'ready';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('작동은 된단다!');
    const apiUrl = 'https://dev.snorose.com';
    const endpoint = '/v1/users/findid';
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post(apiUrl + endpoint, formData, {
        headers,
      });
      navigate('/foundId', { state: { loginId: response.result.loginId } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.pageFrame}>
      <form onSubmit={handleSubmit}>
        <div className={styles.findIdFrame}>
          <Link to='/login'>
            <Icon
              id='left-arrow'
              width='1.162rem'
              height='1.048rem'
              className={styles.arrowLeft}
            />
          </Link>
          <h1
            className={styles.pageTitle}
            onClick={() => {
              console.log(nameStyle, emailStyle, numberStyle);
            }}
          >
            아이디 찾기
          </h1>
          <Input
            title='이름'
            placeholder='이름을 입력해주세요'
            inputStyle={nameStyle}
            setInputStyle={setNameStyle}
            inputStyleCheck={checkSpecialChar}
            inputType='userName'
            inputData={formData}
            errMsg='특수문자는 사용할 수 없습니다'
          />
          <Input
            title='숙명 구글 메일'
            placeholder='숙명 구글 메일을 입력하세요'
            inputStyle={emailStyle}
            setInputStyle={setEmailStyle}
            inputStyleCheck={checkSookmyungMail}
            inputType='email'
            inputData={formData}
            errMsg='숙명 이메일만 입력 가능합니다'
          />
          <Input
            title='학번'
            placeholder='학번을 입력하세요'
            inputStyle={numberStyle}
            setInputStyle={setNumberStyle}
            inputStyleCheck={checkStudentNum}
            inputType='studentNumber'
            inputData={formData}
            errMsg='학번 형식이 옳지 않습니다'
          />

          {submitState() === 'wrong' ? (
            <div className={styles.errFrame}>
              <p>입력한 내용을 다시 한 번</p>
              <p>확인해주세요</p>
            </div>
          ) : (
            ''
          )}
          <Submit btnName='다음으로' btnState={submitState()} />
        </div>
      </form>
    </div>
  );
}
