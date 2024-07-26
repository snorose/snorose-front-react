import { React, useState } from 'react';
import styles from './Input.module.css';

export default function Input({
  title,
  placeholder,
  inputStyle,
  setInputStyle,
  inputStyleCheck,
  inputType,
  inputData,
  errMsg,
}) {
  return (
    <div>
      <p className={styles.title}>{title}</p>
      <input
        type='text'
        placeholder={placeholder}
        className={styles[inputStyle] + ' ' + styles['input']}
        onChange={(e) => {
          inputData[inputType] = e.target.value;
          setInputStyle('ready');
        }}
        onBlur={(e) => {
          setInputStyle(inputStyleCheck(e.target.value));
        }}
        spellCheck='false'
      />
      {inputStyle === 'wrong' ? <p className={styles.errMsg}>{errMsg}</p> : ''}
    </div>
  );
}
