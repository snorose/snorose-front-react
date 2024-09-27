import { authAxios } from '@/axios';

// 좋아요 추가 & 삭제 (type=posts or comments, typeId=postId or commentId)
export const like = async ({ type, sourceId }) => {
  const response = await authAxios.post(`/v1/likes/${type}/${sourceId}`);
  return response?.data.result;
};

export const unlike = async ({ type, sourceId }) => {
  const response = await authAxios.delete(`/v1/likes/${type}/${sourceId}`);
  return response?.data.result;
};
