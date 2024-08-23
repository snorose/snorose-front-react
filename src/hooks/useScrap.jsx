import { useState, useEffect } from 'react';
import { postScrap, deleteScrap } from '@/apis/scrap';

// 스크랩 훅
const useScrap = (postId, initialState, refetch) => {
  const [isScrapped, setIsScrapped] = useState(initialState);

  const toggleScrap = async () => {
    try {
      const action = isScrapped ? deleteScrap : postScrap;
      await action(postId);
      setIsScrapped((prev) => !prev);
      refetch();
    } catch (error) {
      console.error('스크랩 에러:', error);
    }
  };

  useEffect(() => {
    setIsScrapped(initialState);
  }, [initialState]);

  return { isScrapped, toggleScrap };
};

export default useScrap;
