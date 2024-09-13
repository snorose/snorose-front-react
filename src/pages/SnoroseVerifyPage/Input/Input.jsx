import styles from './Input.module.css';

export default function Input({
  label,
  type,
  value,
  placeholder,
  onChange,
  validate,
  errorMessage = '',
}) {
  const isValid = validate ? validate(value) : true;
  const isEmpty = value === '';

  return (
    <div>
      {label && <span className={styles.label}>{label}</span>}
      <input
        className={`${styles.input} ${!isEmpty && !isValid && styles.isInvalid}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {!isEmpty && !isValid && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}
