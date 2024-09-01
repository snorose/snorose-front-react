import { useCommentContext } from '@/contexts/CommentContext.jsx';

import { useComment, useToast } from '@/hooks';
import { TOAST } from '@/constants';

import { Icon } from '../../components/Icon';

import styles from './InputBar.module.css';

const InputBar = () => {
  const { editComment, postComment } = useComment();
  const { toast } = useToast();

  const {
    isEdit,
    setIsEdit,
    commentId,
    content,
    setCommentId,
    setContent,
    inputRef,
  } = useCommentContext();

  const handleInputChange = (e) => setContent(e.target.value);

  // 댓글 등록 or 수정
  const submitComment = () => {
    if (!content.trim()) {
      toast(TOAST.EMPTY_COMMENT);
      return;
    }

    console.log(commentId);
    console.log(content);

    if (isEdit) {
      editComment.mutate({
        commentId,
        content,
      });
      setIsEdit(false);
    } else {
      postComment.mutate({ parentId: commentId, content });
    }

    setCommentId(undefined);
    setContent('');
  };

  // Enter 키 입력 시 댓글 등록
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitComment();
    }
  };

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
        onClick={submitComment}
      />
    </div>
  );
};

export default InputBar;
