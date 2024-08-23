import { useState, useEffect } from 'react';
import { postLike, deleteLike } from '@/apis/like';

// 좋아요 훅
const useLike = (type, typeId, initialState, refetch) => {
  const [isLiked, setIsLiked] = useState(initialState);

  const toggleLike = async () => {
    try {
      const action = isLiked ? deleteLike : postLike;
      await action(type, typeId);
      setIsLiked((prev) => !prev);
      refetch();
    } catch (error) {
      console.error('좋아요 에러:', error);
    }
  };

  useEffect(() => {
    setIsLiked(initialState);
  }, [initialState]);

  return { isLiked, toggleLike };
};

export default useLike;
