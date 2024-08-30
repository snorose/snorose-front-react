import { authAxios } from '../axios';

export const downloadExamReview = async (postId, fileName) => {
  const response = await authAxios.get(
    `/v1/reviews/files/${postId}/download/${fileName}`,
    { responseType: 'blob' }
  );
  return response;
};

export const getReviewList = async (page = 0) => {
  const response = await authAxios.get(`/v1/reviews/32/list/${page}`);
  return response.data.result;
};

export const getReviewDetail = async (postId) => {
  const response = await authAxios.get(`/v1/reviews/${postId}`);
  return response.data.result;
};

export const editReviewDetail = async (postId, edit) => {
  const response = await authAxios.patch(`/v1/reviews/${postId}`, null, {
    params: edit,
  });
  return response;
};

export const deleteExamReview = async (postId) => {
  const response = await authAxios.delete(`/v1/reviews/${postId}`);
  return response;
};

export const checkExamReviewDuplication = async ({
  lectureName,
  professor,
  classNumber,
  lectureYear,
  semester,
  examType,
}) => {
  const response = await authAxios.post('/v1/reviews/check-duplication', {
    lectureName,
    professor,
    classNumber,
    lectureYear,
    semester,
    examType,
  });
  return response;
};

export const postExamReview = async ({ data, file }) => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

  formData.append('post', blob);
  formData.append('file', file);

  try {
    const response = await authAxios.post('/v1/reviews/review', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.status === 201) {
      alert(
        '후기 등록이 완료되었어요! 후기는 관리자 인증 전까지 수정 가능해요'
      );
    }

    return response;
  } catch (error) {
    if (error.response.status === 400) {
      alert('pdf 파일만 업로드할 수 있습니다.');
    } else if (error.response.status === 404) {
      alert('존재하지 않는 게시판입니다.');
    } else if (error.response.status === 409) {
      alert('중복 후기가 있습니다.');
    } else if (error.response.status === 413) {
      alert('용량이 10MB 미만인 파일만 업로드할 수 있습니다.');
    }

    return error.response;
  }
};
