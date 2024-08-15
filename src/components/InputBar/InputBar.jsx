import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { postComment } from '../../apis/comment';
import { Icon } from '../../components/Icon';
import styles from './InputBar.module.css';

const InputBar = forwardRef(({ postId, parentId, onCommentSubmit }, ref) => {
  const [content, setContent] = useState('');
  const inputRef = useRef(null); // Ref to the input element

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await submitComment();
    }
  };

  const handleIconClick = async () => {
    await submitComment();
  };

  const submitComment = async () => {
    console.log(content);
    if (content.trim()) {
      try {
        await postComment({ postId, parentId, content });
        setContent('');
        if (onCommentSubmit) {
          await onCommentSubmit();
        }
      } catch (error) {
        console.error('댓글 등록에 실패했습니다.', error);
      }
    } else {
      alert('댓글을 입력하세요.');
    }
  };

  useImperativeHandle(ref, () => ({
    focusInput() {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <div className={styles.container}>
      <div className={styles.input_bar}>
        <Icon id='cloud' width='25' height='16' />
        <input
          ref={inputRef} // Attach ref to the input element
          className={styles.input_zone}
          placeholder='댓글을 입력하세요'
          value={content}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Icon
        className={styles.enter}
        id='arrow-up-right'
        width='32'
        height='32'
        onClick={handleIconClick}
      />
    </div>
  );
});

export default InputBar;
