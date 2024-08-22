import { authAxios } from '@/axios/index.js';

export const searchByBoard = async ({
  boardId,
  page,
  keyword,
  lectureYear,
  semester,
  examType,
}) => {
  if (keyword !== '') {
    const response = await authAxios.get(
      `/v1/search/boards/${boardId}/${page}`,
      {
        params: {
          keyword,
          ...(lectureYear && { lectureYear }),
          ...(semester && { semester }),
          ...(examType && { examType }),
        },
      }
    );
    return response.data.result;
  }
};
