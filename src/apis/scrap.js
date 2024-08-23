import { authAxios } from '../axios';

// 게시글 스크랩 추가 & 삭제
export const postScrap = async (postId) => {
  const response = await authAxios.post(`/v1/scraps/posts/${postId}`);
  return response.data.result;
};

export const deleteScrap = async (postId) => {
  const response = await authAxios.delete(`/v1/scraps/posts/${postId}`);
  return response.data.result;
};
