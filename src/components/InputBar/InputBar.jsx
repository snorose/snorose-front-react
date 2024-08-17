import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { postComment, patchComment } from '../../apis/comment';
import { Icon } from '../../components/Icon';
import styles from './InputBar.module.css';

const InputBar = forwardRef(
  (
    {
      postId,
      parentId,
      onCommentSubmit,
      inputValue = '',
      isEditing,
      selectedCommentId,
      resetEditingState,
    },
    ref
  ) => {
    const [content, setContent] = useState(inputValue);
    const inputRef = useRef(null);

    React.useEffect(() => {
      setContent(inputValue);
    }, [inputValue]);

    const handleInputChange = (e) => setContent(e.target.value);

    // 댓글 등록 or 수정
    const submitComment = async () => {
      if (!content.trim()) {
        alert('댓글을 입력하세요.');
        return;
      }
      try {
        if (isEditing) {
          await patchComment({
            postId,
            commentId: selectedCommentId,
            parentId,
            content,
          });
          resetEditingState();
        } else {
          await postComment({ postId, parentId, content });
        }
        setContent('');
        if (onCommentSubmit) {
          await onCommentSubmit(); // 댓글 등록 후 댓글 목록 갱신
        }
      } catch (error) {
        console.error('댓글 처리에 실패했습니다.', error);
        alert('댓글 처리에 실패했습니다.');
      }
    };

    // input으로의 포커스 제공
    useImperativeHandle(ref, () => ({
      focusInput() {
        inputRef.current?.focus();
      },
    }));

    // Enter 키 입력 시 댓글 등록
    const handleKeyPress = async (e) => {
      if (e.key === 'Enter') {
        await submitComment();
      }
    };

    // 댓글 등록 아이콘 클릭 시 댓글 등록
    const handleIconClick = async () => await submitComment();

    return (
      <div className={styles.container}>
        <div className={styles.input_bar}>
          <Icon id='cloud' width='25' height='16' />
          <input
            ref={inputRef}
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
  }
);

export default InputBar;
