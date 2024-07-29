import { React } from 'react';
import styles from './Input.module.css';

export default function Input({
  title,
  placeholder,
  className,
  setClassName,
  classNameCheck,
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
        className={`${styles[className]} ${styles['input']}`}
        onChange={(e) => {
          inputData[inputType] = e.target.value;
          setClassName('ready');
        }}
        onBlur={(e) => {
          setClassName(classNameCheck(e.target.value));
        }}
        spellCheck='false'
      />
      {className === 'wrong' && <p className={styles.errMsg}>{errMsg}</p>}
    </div>
  );
}
