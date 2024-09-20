import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { findPw } from '@/apis';

import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { Submit } from '@/components/Submit';

import {
  checkID,
  checkSookmyungMail,
} from '@/pages/LoginPage/FindIdPage/inputCheck.js';

import styles from './FindPwPage.module.css';

export default function FindPwPage() {
  const navigate = useNavigate();
  const [idStyle, setIdStyle] = useState('ready');
  const [emailStyle, setEmailStyle] = useState('ready');
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
      checkID,
      'loginId',
      '아이디는 영어, 숫자만 가능합니다',
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
  ];
  const submitState = () => {
    if (idStyle === 'right' && emailStyle === 'right') return 'right';
    else if (idStyle === 'wrong' || emailStyle === 'wrong') return 'wrong';
    else return 'ready';
  };

  return (
    <div className={styles.pageFrame}>
      <form
        onSubmit={(e) => {
          findPw(e, formData, navigate);
        }}
      >
        <div className={styles.findIdFrame}>
          <div>
            <Link to='/login'>
              <Icon
                id='arrow-left'
                width='1.162rem'
                height='1.048rem'
                className={styles.arrowLeft}
              />
            </Link>
            <h1 className={styles.pageTitle}>비밀번호 찾기</h1>

            {inputProps.map((props, i) => {
              return (
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
              );
            })}
          </div>
          <div className={styles.buttonFrame}>
            <Submit btnName='완료' className={submitState()} />
            <Link to='/find-id'>
              <div className={styles.findIDButton}>
                <p>아이디 찾기</p>
                <Icon id='angle-right' width='24px' height='24px' />
              </div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
