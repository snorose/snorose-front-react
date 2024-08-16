import { authAxios } from '../axios';

export const getCommentList = async (postId) => {
  const response = await authAxios.get(`/v1/posts/${postId}/comments`);
  return response.data.result;
};

export const postComment = async (postId, { parentId, content }) => {
  const response = await authAxios.post(`/v1/posts/${postId}/comments`, {
    parentId,
    content,
  });
  return response.data.result;
};
