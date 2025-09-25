import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '@/apis';

import {
  CategoryFieldset,
  Button,
  Dropdown,
  Icon,
  Input,
} from '@/shared/component';
import { MAJORS } from '@/shared/constant';

import {
  checkSpecialChar,
  checkStudentNum,
  checkBirthday,
} from '@/feature/account/lib';

import style from './UserInfoStep.module.css';

export default function UserInfoStep({ setFormData, formData }) {
  const register = useRegister();
  const navigate = useNavigate();

  const [nicknameStyle, setNicknameStyle] = useState('ready');
  const [stuNumStyle, setStuNumStyle] = useState('ready');
  const [birthdayStyle, setBirthdayStyle] = useState('ready');
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  // 개인정보 동의 이벤트 리스너 등록
  useEffect(() => {
    const handlePrivacyAgreed = () => {
      if (window.privacyTermsAgreed) {
        setIsTermsChecked(true);
        // 사용 후 정리
        window.privacyTermsAgreed = false;
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('privacyTermsAgreed', handlePrivacyAgreed);

    // 컴포넌트가 마운트될 때 한 번 확인 (페이지 새로고침 등의 경우)
    handlePrivacyAgreed();

    // cleanup
    return () => {
      window.removeEventListener('privacyTermsAgreed', handlePrivacyAgreed);
    };
  }, []);

  // 페이지 포커스 시에도 확인 (뒤로가기로 돌아왔을 때)
  useEffect(() => {
    const handleFocus = () => {
      if (window.privacyTermsAgreed) {
        setIsTermsChecked(true);
        window.privacyTermsAgreed = false;
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const isFormValid = () =>
    nicknameStyle === 'right' &&
    stuNumStyle === 'right' &&
    birthdayStyle === 'right' &&
    formData.name &&
    isTermsChecked;

  const getButtonState = () => (isFormValid() ? 'right' : 'ready');

  const handleRegister = async () => {
    if (getButtonState() !== 'right') {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }
    try {
      await register(formData, navigate);
    } catch (error) {
      console.error('회원가입 처리 중 오류:', error);
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div>
        <p className={style.title}>
          사용자 정보를
          <br />
          입력해 주세요
        </p>
        <div className={style.inputFrame}>
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
        <div className={style.inputFrame}>
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
        <div className={style.inputFrame}>
          <CategoryFieldset title='전공' required>
            <Dropdown
              options={MAJORS}
              select={formData}
              setFn={setFormData}
              placeholder='전공을 선택해주세요'
            />
          </CategoryFieldset>
        </div>
        <div className={style.inputFrame}>
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

        <CheckTerms
          label={'개인정보 수집 및 이용 동의'}
          required
          navigate={navigate}
          isChecked={isTermsChecked}
          setIsChecked={setIsTermsChecked}
        />
      </div>

      <div className={style.submit}>
        <Button
          btnName='다음으로'
          className={getButtonState()}
          onClick={handleRegister}
        />
      </div>
    </>
  );
}

function CheckTerms({
  label,
  isChecked = false,
  required = false,
  navigate,
  setIsChecked,
}) {
  const tagStyle = required ? style.required : style.optional;
  const tag = required ? '필수' : '선택';

  const handlePrivacyTermClick = () => {
    navigate('/terms/privacy');
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={style.checkTerms}>
      <input
        id='terms'
        className={style.checkbox}
        type='checkbox'
        hidden
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor='terms' className={style.label}>
        <Icon
          className={`${style.blueBox} ${isChecked ? style.checked : ''}`}
          id='checkbox-blue'
          width={20}
          height={20}
        />
        <Icon
          className={`${style.greyBox} ${!isChecked ? style.unchecked : ''}`}
          id='checkbox-grey'
          width={20}
          height={20}
        />

        <span className={`${style.tag} ${tagStyle}`}>{tag}</span>
        <p className={style.checkboxLabel}>{label}</p>
      </label>

      <div className={style.termsLink} onClick={handlePrivacyTermClick}>
        <Icon id='chevron-right' width={20} height={20} />
      </div>
    </div>
  );
}
