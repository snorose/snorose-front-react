import { useState, useEffect } from 'react';
import { postScrap, deleteScrap } from '@/apis/scrap';

// 스크랩 훅
const useScrap = (postId, initialState, refetch) => {
  const [isScrapped, setIsScrapped] = useState(initialState);
  const [error, setError] = useState(null);

  const toggleScrap = async () => {
    try {
      const action = isScrapped ? deleteScrap : postScrap;
      await action(postId);
      setIsScrapped((prev) => !prev);
      refetch();
      setError(null);
    } catch (err) {
      setError(err);
      console.error('스크랩 에러:', err);
    }
  };

  useEffect(() => {
    setIsScrapped(initialState);
  }, [initialState]);

  return { isScrapped, toggleScrap, error };
};

export default useScrap;
