import {
  createContext,
  useState,
  useRef,
  useMemo,
  useContext,
  useEffect,
} from 'react';

const CommentContext = createContext();

export function CommentContextProvider({ children }) {
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState();
  const [content, setContent] = useState('');
  const inputRef = useRef();

  const inputFocus = () => {
    inputRef.current?.focus();
  };

  const value = useMemo(
    () => ({
      isEdit,
      setIsEdit,
      commentId,
      content,
      setCommentId,
      setContent,
      inputRef,
      inputFocus,
    }),
    [isEdit, commentId, content]
  );

  const onBlur = () => {
    if (!isEdit) {
      setCommentId(undefined);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onBlur);

    return () => window.removeEventListener('click', onBlur);
  }, [isEdit]);

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}

export function useCommentContext() {
  return useContext(CommentContext);
}
