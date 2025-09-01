import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '@/apis';

import { CategoryFieldset, Dropdown, Input, Button } from '@/shared/component';
import { MAJORS } from '@/shared/constant';

import {
  checkSpecialChar,
  checkStudentNum,
  checkBirthday,
} from '@/feature/account/lib';

import styles from './UserInfoStep.module.css';

export default function UserInfoStep({ setFormData, formData }) {
  const register = useRegister();
  const [nicknameStyle, setNicknameStyle] = useState('ready');
  const [stuNumStyle, setStuNumStyle] = useState('ready');
  const [birthdayStyle, setBirthdayStyle] = useState('ready');
  const navigate = useNavigate();
  const checkDone = () => {
    if (
      nicknameStyle === 'right' &&
      stuNumStyle === 'right' &&
      birthdayStyle === 'right' &&
      formData.name
    ) {
      return 'right';
    }
    return 'ready';
  };

  return (
    <div className={styles.pageFrame}>
      <div>
        <p className={styles.title}>
          사용자 정보를
          <br />
          입력해 주세요
        </p>
        <div className={styles.inputFrame}>
          <Input
            title={'닉네임'}
            placeholder={'닉네임을 입력해 주세요'}
            className={nicknameStyle}
            setClassName={setNicknameStyle}
            classNameCheck={checkSpecialChar}
            inputType={'nickname'}
            inputData={setFormData}
            data={formData}
            errMsg={'특수문자 제외 2자 이상 20자 이하로 작성해 주세요'}
          />
        </div>
        <div className={styles.inputFrame}>
          <Input
            title={'학번'}
            placeholder={'학번을 입력해 주세요'}
            className={stuNumStyle}
            setClassName={setStuNumStyle}
            classNameCheck={checkStudentNum}
            inputType={'studentNumber'}
            inputData={setFormData}
            data={formData}
            errMsg={'학번 형식을 올바르게 입력해 주세요'}
          />
        </div>
        <div className={styles.inputFrame}>
          <CategoryFieldset title='전공' required>
            <Dropdown
              options={MAJORS}
              select={formData}
              setFn={setFormData}
              placeholder='전공을 선택해주세요'
            />
          </CategoryFieldset>
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
            errMsg={'입력 형식을 확인해 주세요'}
          />
        </div>
      </div>

      <div className={styles.submit}>
        <Button
          btnName='다음으로'
          className={checkDone()}
          onClick={() => register(formData, navigate)}
        />
      </div>
    </div>
  );
}
