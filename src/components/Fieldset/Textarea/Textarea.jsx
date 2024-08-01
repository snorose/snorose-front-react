import styles from './Textarea.module.css';

export default function Textarea({ value, setFn, placeholder }) {
  const handleChange = (event) => {
    setFn(event.target.value);
  };

  return (
    <textarea
      className={styles.textarea}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
