import { authAxios } from '../axios';

const ENDPOINT = '/v1/boards/{boardId}/posts/postlist';

export const getPostList = async (boardId, page=0) => {
  const response = await authAxios.get(
    `/v1/boards/${boardId}/posts/postlist?page=${page}`
  );
  return response.data.result;
};
