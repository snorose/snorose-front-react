import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../../../components/Input/Input/Input';
import { Submit } from '../../../../components/Submit';
import { Icon } from '../../../../components/Icon';
import { MAJORS } from '../../../../constants/majors';
import {
  checkSpecialChar,
  checkStudentNum,
  checkBirthday,
} from '../../FindIdPage/inputCheck';
import Dropdown from '../../../../components/Fieldset/Dropdown/Dropdown.jsx';
import styles from './UserInfoPage.module.css';

export default function UserInfoPage({ setFormData, formData }) {
  const [nicknameStyle, setNicknameStyle] = useState('ready');
  const [stuNumStyle, setStuNumStyle] = useState('ready');
  const [birthdayStyle, setBirthdayStyle] = useState('ready');
  const navigate = useNavigate();

  const checkDone = () => {
    if (
      nicknameStyle === 'right' &&
      stuNumStyle === 'right' &&
      birthdayStyle === 'right'
    ) {
      return 'right';
    }
    return 'ready';
  };
  const postToAPI = async () => {
    const apiUrl = 'http://13.124.33.41:8081';
    const endpoint = '/v1/users/register';
    const data = { ...formData, userRoleId: 1, isBlacklist: false };
    data['major'] = data['name'];
    delete data['name'];
    console.log(data);
    try {
      const response = await axios.post(apiUrl + endpoint, data);
      if (response.data.isSuccess) {
        navigate('/signup/success');
      }
      console.log(response);
    } catch (e) {
      navigate('/signup/failure', {
        state: { message: e.response.data.message },
      });
      console.log(e);
    }
  };
  return (
    <div className={styles.pageFrame}>
      <div className={styles.scrollFrame}>
        <p
          className={styles.text}
          onClick={() => {
            console.log(formData);
          }}
        >
          사용자 정보 입력
        </p>
        <div className={styles.inputFrame}>
          <Input
            title={'닉네임'}
            placeholder={'닉네임을 입력하세요'}
            className={nicknameStyle}
            setClassName={setNicknameStyle}
            classNameCheck={checkSpecialChar}
            inputType={'nickname'}
            inputData={setFormData}
            data={formData}
            errMsg={'특수문자는 사용할 수 없습니다'}
          />
        </div>
        <div className={styles.inputFrame}>
          <Input
            title={'학번'}
            placeholder={'학번을 입력하세요'}
            className={stuNumStyle}
            setClassName={setStuNumStyle}
            classNameCheck={checkStudentNum}
            inputType={'studentNumber'}
            inputData={setFormData}
            data={formData}
            errMsg={'학번 형식이 옳지 않습니다'}
          />
        </div>
        <div className={styles.inputFrame}>
          <p className={styles.majorTitle}>전공</p>
          <Dropdown
            options={MAJORS}
            select={formData}
            setFn={setFormData}
            placeholder='전공을 선택하세요'
            color='#EAF5FD'
          />
        </div>
        <div className={styles.inputFrame}>
          <Input
            title={'생년월일'}
            placeholder={'YYYY-MM-DD'}
            className={birthdayStyle}
            setClassName={setBirthdayStyle}
            classNameCheck={checkBirthday}
            inputType={'birthday'}
            inputData={setFormData}
            data={formData}
            errMsg={'입력 형식을 확인해주세요'}
          />
        </div>
      </div>

      <div className={styles.submit}>
        <Submit
          btnName='다음으로'
          className={checkDone()}
          onClick={postToAPI}
        />
      </div>
    </div>
  );
}
