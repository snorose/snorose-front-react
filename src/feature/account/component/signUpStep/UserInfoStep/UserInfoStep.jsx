import { useState, useEffect, useRef } from 'react';
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
import { PRIVACY_TERM } from '@/feature/account/constant/privacyTerm';

export default function UserInfoStep({ setFormData, formData }) {
  const register = useRegister();
  const navigate = useNavigate();

  const [nicknameStyle, setNicknameStyle] = useState('ready');
  const [stuNumStyle, setStuNumStyle] = useState('ready');
  const [birthdayStyle, setBirthdayStyle] = useState('ready');
  const [isTermsChecked, setIsTermsChecked] = useState(false);

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
            errMsg={'특수문자 제외 2자 이상 20자 이하로 작성해주세요'}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tagStyle = required ? style.required : style.optional;
  const tag = required ? '필수' : '선택';

  const handlePrivacyTermClick = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleModalAgree = () => {
    setIsChecked(true);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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

      {isModalOpen && (
        <PrivacyTermModal
          onAgree={handleModalAgree}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

function PrivacyTermModal({ onAgree, onClose }) {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const descriptionRef = useRef(null);

  const handleScroll = (e) => {
    // 이미 한 번 끝까지 스크롤했다면 더 이상 확인하지 않음
    if (hasScrolledToEnd) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // 스크롤이 끝에 도달했는지 확인 (약간의 여유값 추가)
    const isAtEnd = scrollTop + clientHeight >= scrollHeight - 5;

    if (isAtEnd) {
      setHasScrolledToEnd(true);
    }
  };

  // 컨텐츠가 스크롤 없이도 모두 보이는 경우 처리
  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      if (scrollHeight <= clientHeight) {
        setHasScrolledToEnd(true);
      }
    }
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={style.modalOverlay} onClick={handleOverlayClick}>
      <div className={style.modalContainer}>
        <div className={style.modalHeader}>
          <h2 className={style.modalTitle}>
            {PRIVACY_TERM.title}
            <span className={style.modalRequired}>*</span>
          </h2>
          <button className={style.closeButton} onClick={onClose}>
            <Icon id='x' width={24} height={24} />
          </button>
        </div>

        <div
          className={style.modalContent}
          ref={descriptionRef}
          onScroll={handleScroll}
        >
          <div className={style.modalSummary}>{PRIVACY_TERM.summary}</div>
          <div className={style.modalGuide}>{PRIVACY_TERM.guide}</div>
          {PRIVACY_TERM.details.map((section, idx) => (
            <div key={idx} className={style.modalDetails}>
              <div className={style.modalSubtitle}>{section.title}</div>
              <div className={style.modalText}>{section.content}</div>
            </div>
          ))}
          <div className={style.modalNotice}>{PRIVACY_TERM.notice}</div>
        </div>

        <div className={style.modalFooter}>
          <Button
            btnName='동의하고 계속하기'
            className={hasScrolledToEnd ? 'right' : 'ready'}
            disabled={!hasScrolledToEnd}
            onClick={onAgree}
          />
        </div>
      </div>
    </div>
  );
}
