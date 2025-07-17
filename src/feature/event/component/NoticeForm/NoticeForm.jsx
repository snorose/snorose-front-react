import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './NoticeForm.module.css';
export default function NoticeForm({ data, onChange }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  return (
    <div className={styles.noticeArea}>
      <TextareaAutosize
        className={styles.title}
        placeholder='제목'
        value={data.title}
        onChange={(e) => onChange('title', e.target.value)}
      />
      <TextareaAutosize
        className={styles.content}
        placeholder='내용'
        value={data.content}
        onChange={(e) => onChange('content', e.target.value)}
      />
    </div>
  );
}
