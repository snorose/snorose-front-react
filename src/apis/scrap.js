import { authAxios } from '@/axios';

export const scrap = async ({ postId }) => {
  const response = await authAxios.post(`/v1/scraps/posts/${postId}`);
  return response?.data.result;
};

export const unscrap = async ({ postId }) => {
  const response = await authAxios.delete(`/v1/scraps/posts/${postId}`);
  return response?.data.result;
};
