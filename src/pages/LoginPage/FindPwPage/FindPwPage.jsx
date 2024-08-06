import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '../../../components/Icon';
import { Input } from '../../../components/Input';
import { Submit } from '../../../components/Submit';
import { checkSpecialChar, checkSookmyungMail } from '../FindIdPage/inputCheck';
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
      checkSpecialChar,
      'loginId',
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
  ];
  const submitState = () => {
    if (idStyle === 'right' && emailStyle === 'right') return 'right';
    else if (idStyle === 'wrong' || emailStyle === 'wrong') return 'wrong';
    else return 'ready';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://13.124.33.41:8081';
    const endpoint = '/v1/users/findPW';
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    };
    try {
      await axios.post(apiUrl + endpoint, formData, {
        headers,
      });
      navigate('/found-pw', {
        state: { email: formData.email },
      });
    } catch (e) {
      if (!e.response.data.isSuccess) {
        navigate('/not-found-pw', { state: { access: true } });
      }
    }
  };

  return (
    <div className={styles.pageFrame}>
      <form onSubmit={handleSubmit}>
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
                <Input
                  title={props[0]}
                  placeholder={props[1]}
                  className={props[2]}
                  setClassName={props[3]}
                  classNameCheck={props[4]}
                  inputType={props[5]}
                  inputData={formData}
                  errMsg={props[6]}
                  key={i}
                />
              );
            })}
          </div>
          <div className={styles.buttonFrame}>
            {submitState() === 'wrong' && (
              <div className={styles.errFrame}>
                <p>입력한 내용을 다시 한 번</p>
                <p>확인해주세요</p>
              </div>
            )}

            <Submit btnName='다음으로' className={submitState()} />
          </div>
        </div>
      </form>
    </div>
  );
}
