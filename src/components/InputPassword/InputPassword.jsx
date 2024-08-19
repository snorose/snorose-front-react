import React, { useState } from 'react';
import { Icon } from '../Icon';
import styles from './InputPassword.module.css';

const InputPassword = ({
  title = '',
  placeholder = '',
  value = '',
  onChange,
  errorMessage = '',
}) => {
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  const handlePasswordType = () => {
    setPasswordType((prev) => ({
      type: prev.visible ? 'password' : 'text',
      visible: !prev.visible,
    }));
  };

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div
        className={`${styles.inputWrapper} ${
          value && !errorMessage ? styles.rightInputWrapper : ''
        } ${errorMessage ? styles.errorInputWrapper : ''}`}
      >
        <input
          type={passwordType.type}
          className={`${styles.inputText} ${
            value && !errorMessage ? styles.rightInputText : ''
          } ${errorMessage ? styles.errorInputText : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
        <Icon
          onClick={handlePasswordType}
          id={passwordType.visible ? 'closed-eye' : 'opened-eye'}
        />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default InputPassword;
