import styles from './TextField.module.css';

export default function TextField({ value, onChange, placeholder }) {
  return (
    <input
      className={styles.input}
      type='text'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
