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

  const resetCommentState = (event) => {
    if (event && inputRef.current && !inputRef.current.contains(event.target)) {
      setCommentId(undefined);
      setIsEdit(false);
      // setContent('');
    }
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
      resetCommentState,
    }),
    [isEdit, commentId, content]
  );

  useEffect(() => {
    window.addEventListener('click', resetCommentState);
    return () => window.removeEventListener('click', resetCommentState);
  }, []);

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}

export function useCommentContext() {
  return useContext(CommentContext);
}
