import styles from './Input.module.css';
import { useEffect } from 'react';

export default function Input({
  title,
  type,
  placeholder,
  className,
  setClassName,
  classNameCheck,
  inputType,
  inputData,
  data,
  errMsg,
}) {
  useEffect(() => {
    try {
      if (data[inputType]) {
        if (setClassName !== undefined) {
          const checkedClass = classNameCheck(data[inputType]);
          checkedClass instanceof Promise
            ? checkedClass.then((res) => setClassName(res))
            : setClassName(checkedClass);
        }
      }
    } catch (e) {}
  }, []);

  return (
    <>
      {title && <p className={styles.title}>{title}</p>}
      <input
        value={data ? (data[inputType] ? data[inputType] : '') : undefined}
        type={type}
        placeholder={placeholder}
        className={`${styles[className]} ${styles['input']}`}
        onChange={(e) => {
          inputData((prev) => ({ ...prev, [inputType]: e.target.value }));
          if (setClassName !== undefined) setClassName('ready');
        }}
        onBlur={(e) => {
          if (setClassName !== undefined) {
            const checkedClass = classNameCheck(e.target.value);
            checkedClass instanceof Promise
              ? checkedClass.then((res) => setClassName(res))
              : setClassName(checkedClass);
          }
        }}
        spellCheck='false'
      />
      {className === 'wrong' && <p className={styles.errMsg}>{errMsg}</p>}
    </>
  );
}
