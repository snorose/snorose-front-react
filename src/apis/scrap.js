import { authAxios } from '@/axios/index.js';

export const scrap = async ({ postId }) => {
  const response = await authAxios.post(`/v1/scraps/posts/${postId}`);
  return response;
};

export const deleteScrap = async ({ postId }) => {
  const response = await authAxios.delete(`/v1/scraps/posts/${postId}`);
  return response;
};
