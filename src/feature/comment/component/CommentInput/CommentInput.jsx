import TextareaAutosize from 'react-textarea-autosize';

import { useToast } from '@/shared/hook';
import { Icon } from '@/shared/component';

import { useCommentContext } from '@/feature/comment/context';
import { useComment } from '@/feature/comment/hook';

import styles from './CommentInput.module.css';

const CommentInput = () => {
  const { editComment, createComment, loading, setLoading } = useComment();
  const { toast } = useToast();

  const {
    isEdit,
    commentId,
    content,
    setContent,
    resetCommentState,
    inputRef,
  } = useCommentContext();

  const handleInputChange = (e) => setContent(e.target.value);

  // 댓글 등록 or 수정
  const submitComment = () => {
    if (loading) {
      return;
    }

    if (!content.trim()) {
      toast('댓글 내용을 입력하세요.');
      return;
    }

    if (content.length > 1000) {
      toast('댓글은 1000자 이내로 작성해주세요.');
      return;
    }

    const mutation = isEdit ? editComment : createComment;

    setLoading(true);
    mutation.mutate(
      {
        ...(isEdit ? { commentId } : { parentId: commentId }),
        content,
      },
      {
        onSuccess: () => {
          resetCommentState();
          inputRef.current.blur();
        },
      }
    );
  };

  // command + enter 또는 ctrl + enter 입력 시 댓글 등록
  const handleKeyPress = (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (
      (isMac && e.key === 'Enter' && e.metaKey) ||
      (!isMac && e.key === 'Enter' && e.ctrlKey)
    ) {
      e.preventDefault();
      submitComment();
    }
  };

  return (
    <div
      className={styles.container}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.input_bar}>
        <Icon id='cloud' width={25} height={16} />
        <TextareaAutosize
          ref={inputRef}
          className={styles.input_zone}
          placeholder='댓글을 입력하세요'
          value={content}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          maxRows={5}
        />
      </div>
      <Icon
        className={styles.enter}
        id='arrow-up-right'
        width={32}
        height={32}
        onClick={submitComment}
      />
    </div>
  );
};

export default CommentInput;
