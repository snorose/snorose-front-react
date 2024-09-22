import styles from './InputItem.module.css';

export default function InputItem({
  className,
  tag,
  required,
  value,
  placeholder,
  setFn,
}) {
  const handleChange = (event) => {
    setFn(event.target.value);
  };

  return (
    <div className={`${styles.item} ${className}`}>
      <span className={styles.tag}>
        {tag}
        {required && <span className={styles.required}></span>}
      </span>
      <input
        className={styles.input}
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
