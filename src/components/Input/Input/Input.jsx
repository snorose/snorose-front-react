import styles from './Input.module.css';

export default function Input({
  title,
  type,
  placeholder,
  className,
  setClassName,
  classNameCheck,
  inputType,
  inputData,
  errMsg,
}) {
  return (
    <>
      {title && <p className={styles.title}>{title}</p>}
      <input
        type={type}
        placeholder={placeholder}
        className={`${styles[className]} ${styles['input']}`}
        onChange={(e) => {
          inputData((prev) => ({ ...prev, [inputType]: e.target.value }));
          if (setClassName !== undefined) setClassName('ready');
        }}
        onBlur={(e) => {
          if (setClassName !== undefined)
            setClassName(classNameCheck(e.target.value));
        }}
        spellCheck='false'
      />
      {className === 'wrong' && <p className={styles.errMsg}>{errMsg}</p>}
    </>
  );
}
