import { authAxios } from '@/axios';

import { BOARD_ID } from '@/constants';

export const searchByBoard = async ({ boardId, page, params }) => {
  const endpoint =
    boardId === BOARD_ID.all
      ? `/v1/search/post/${page}`
      : `/v1/search/boards/${boardId}/${page}`;

  const response = await authAxios.get(endpoint, {
    params,
  });
  return response?.data.result;
};
