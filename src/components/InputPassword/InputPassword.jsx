import React, { useState, useEffect } from 'react';
import { Icon } from '../Icon';
import styles from './InputPassword.module.css';

const InputPassword = ({
  title = '',
  placeholder = '',
  value = '',
  onChange,
  errorMessage = '',
  validatePassword = false, // 유효성 검사 활성화 여부
  isPasswordCheck = false, // 비밀번호 확인 필드 여부
  compareValue = '', // 비교할 값 (새 비밀번호)
  isStatic = false, // 고정된 스타일 (색상 변경 없음)
}) => {
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });
  const [internalErrorMessage, setInternalErrorMessage] = useState('');

  useEffect(() => {
    if (validatePassword && value && !isPasswordCheck && !isStatic) {
      validatePasswordStrength(value);
    } else if (isPasswordCheck && value) {
      validatePasswordMatch(value, compareValue);
    } else {
      setInternalErrorMessage(''); // 비어 있을 경우 오류 메시지를 초기화
    }
  }, [value, validatePassword, isPasswordCheck, compareValue, isStatic]);

  const handlePasswordType = () => {
    setPasswordType((prev) => ({
      type: prev.visible ? 'password' : 'text',
      visible: !prev.visible,
    }));
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
    if (validatePassword && !isPasswordCheck && !isStatic) {
      validatePasswordStrength(newValue);
    } else if (isPasswordCheck) {
      validatePasswordMatch(newValue, compareValue);
    }
  };

  const validatePasswordStrength = (password) => {
    const specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]/;
    const emojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;

    if (
      password.length < 8 ||
      !/[A-Za-z]/.test(password) ||
      !/\d/.test(password) ||
      !specialCharRegex.test(password) ||
      emojiRegex.test(password)
    ) {
      setInternalErrorMessage(
        '영어, 숫자, 특수문자를 포함해 8자 이상으로 작성해주세요'
      );
    } else {
      setInternalErrorMessage('');
    }
  };

  const validatePasswordMatch = (password, compareValue) => {
    if (password !== compareValue) {
      setInternalErrorMessage('비밀번호가 일치하지 않습니다');
    } else {
      setInternalErrorMessage('');
    }
  };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div
        className={`${styles.inputWrapper} ${
          !isStatic && value && !internalErrorMessage
            ? styles.rightInputWrapper
            : ''
        } ${!isStatic && internalErrorMessage ? styles.errorInputWrapper : ''}`}
      >
        <input
          type={passwordType.type}
          className={`${styles.inputText} ${
            !isStatic && value && !internalErrorMessage
              ? styles.rightInputText
              : ''
          } ${!isStatic && internalErrorMessage ? styles.errorInputText : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
        <Icon
          onClick={handlePasswordType}
          id={passwordType.visible ? 'closed-eye' : 'opened-eye'}
        />
      </div>
      {internalErrorMessage && (
        <p className={styles.errorMessage}>{internalErrorMessage}</p>
      )}
    </div>
  );
};

export default InputPassword;
