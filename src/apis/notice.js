import { authAxios } from '../axios';

export const getNoticeList = async (boardId) => {
  const response = await authAxios.get(`/v1/notices/boards/${boardId}`);
  return response.data.result;
};

export const getNoticeLine = async (boardId) => {
    const response = await authAxios.get(`/v1/notices/boards/${boardId}/top`);
    return response.data.result;
  };
  