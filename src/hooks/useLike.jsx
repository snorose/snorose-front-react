import { useState, useEffect } from 'react';
import { postLike, deleteLike } from '@/apis/like';

// 좋아요 훅
const useLike = (type, typeId, initialState,  refetch = () => {}) => {
  const [isLiked, setIsLiked] = useState(initialState);
  const [error, setError] = useState(null);

  const toggleLike = async () => {
    try {
      const action = isLiked ? deleteLike : postLike;
      await action(type, typeId);
      setIsLiked((prev) => !prev);
      refetch();
      setError(null);
    } catch (err) {
      setError(err);
      console.error('좋아요 에러:', err);
    }
  };

  useEffect(() => {
    setIsLiked(initialState);
  }, [initialState]);

  return { isLiked, toggleLike, error };
};

export default useLike;
