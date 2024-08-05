import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { Icon } from '../../../components/Icon';
import { Input } from '../../../components/Input';
import { Submit } from '../../../components/Submit';

import {
  checkSpecialChar,
  checkSookmyungMail,
  checkStudentNum,
} from './inputCheck';

import styles from './FindIdPage.module.css';

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
  const inputProps = [
    [
      '이름',
      '이름을 입력해주세요',
      nameStyle,
      setNameStyle,
      checkSpecialChar,
      'userName',
      '특수문자는 사용할 수 없습니다',
    ],
    [
      '숙명 구글 메일',
      '숙명 구글 메일을 입력하세요',
      emailStyle,
      setEmailStyle,
      checkSookmyungMail,
      'email',
      '숙명 이메일만 입력 가능합니다',
    ],
    [
      '학번',
      '학번을 입력하세요',
      numberStyle,
      setNumberStyle,
      checkStudentNum,
      'studentNumber',
      '학번 형식이 옳지 않습니다',
    ],
  ];
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
    const apiUrl = 'http://13.124.33.41:8081';
    const endpoint = '/v1/users/findid';
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    };
    try {
      console.log(formData);
      const response = await axios.post(apiUrl + endpoint, formData, {
        headers,
      });
      navigate('/found-id', {
        state: { loginId: response.data.result.loginId },
      });
    } catch (e) {
      console.log(e);
      if (!e.response.data.isSuccess) {
        navigate('/not-found-id');
      }
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

          {inputProps.map((props) => {
            return (
              <Input
                title={props[0]}
                placeholder={props[1]}
                className={props[2]}
                setClassName={props[3]}
                classNameCheck={props[4]}
                inputType={props[5]}
                inputData={formData}
                errMsg={props[6]}
              />
            );
          })}

          {submitState() === 'wrong' && (
            <div className={styles.errFrame}>
              <p>입력한 내용을 다시 한 번</p>
              <p>확인해주세요</p>
            </div>
          )}

          <Submit btnName='다음으로' className={submitState()} />
        </div>
      </form>
    </div>
  );
}
