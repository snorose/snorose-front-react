import { authAxios } from '@/axios';

export const searchByBoard = async ({
  boardId,
  boardType,
  page,
  keyword,
  lectureYear,
  semester,
  examType,
}) => {
  const endpoint =
    boardType === 'all'
      ? `/v1/search/post/${page}`
      : `/v1/search/boards/${boardId}/${page}`;

  const response = await authAxios.get(endpoint, {
    params: {
      ...(keyword && { keyword }),
      ...(lectureYear && { lectureYear }),
      ...(semester && { semester }),
      ...(examType && { examType }),
    },
  });
  return response?.data.result;
};
