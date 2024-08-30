import TextareaAutosize from 'react-textarea-autosize';

import styles from './Textarea.module.css';

export default function Textarea({
  value,
  setFn,
  placeholder,
  minRows,
  maxRows,
}) {
  const handleChange = (event) => {
    setFn(event.target.value);
  };

  return (
    <TextareaAutosize
      className={styles.textarea}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      minRows={minRows}
      maxRows={maxRows}
    />
  );
}
