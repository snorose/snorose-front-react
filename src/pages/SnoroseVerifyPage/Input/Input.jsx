import styles from './Input.module.css';

export default function Input({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
}) {
  return (
    <div>
      {label && <span className={styles.label}>{label}</span>}
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
