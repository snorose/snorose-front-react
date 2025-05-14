import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const CommentContext = createContext();

export function CommentContextProvider({ children }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    isFocused: false,
    parent: 'post',
  });
  const [commentId, setCommentId] = useState();
  const [content, setContent] = useState('');
  const inputRef = useRef();

  const inputFocus = () => {
    inputRef.current?.focus();
  };

  const resetCommentState = (event) => {
    setCommentId(undefined);
    setIsEdit(false);
    setContent('');
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
      isInputFocused,
      setIsInputFocused,
    }),
    [isEdit, commentId, content, isInputFocused]
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
