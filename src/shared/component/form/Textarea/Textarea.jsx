import TextareaAutosize from 'react-textarea-autosize';

import styles from './Textarea.module.css';

export default function Textarea({
  id,
  value,
  onChange,
  placeholder,
  minRows,
  maxRows,
}) {
  return (
    <TextareaAutosize
      id={id}
      className={styles.textarea}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      minRows={minRows}
      maxRows={maxRows}
      style={{
        width: '100%',
        display: 'block',
      }}
    />
  );
}
