import { authAxios } from '../axios';

// 좋아요 추가 & 삭제 (type=posts or comments, typeId=postId or commentId)
export const postLike = async (type, typeId) => {
  console.log(`postLike: /v1/likes/${type}/${typeId}`);
  const response = await authAxios.post(`/v1/likes/${type}/${typeId}`);
  return response.data.result;
};

export const deleteLike = async (type, typeId) => {
  console.log(`postDelete: /v1/likes/${type}/${typeId}`);

  const response = await authAxios.delete(`/v1/likes/${type}/${typeId}`);
  return response.data.result;
};
