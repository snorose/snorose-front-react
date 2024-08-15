import { authAxios } from '../axios';

export const getCommentList = async (postId) => {
  const response = await authAxios.get(`/v1/posts/${postId}/comments`);
  return response.data.result;
};
