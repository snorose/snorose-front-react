import { authAxios } from '@/axios';

export const withdrawAccount = async (body) => {
  const response = await authAxios.delete('/v1/users/withdraw', {
    data: body,
  });

  return response?.data;
};

export const getMyPageUserInfo = async () => {
  const response = await authAxios.get('/v1/users/mypage');

  return response?.data;
};

export const updateUserInfo = async (body) => {
  const response = await authAxios.patch('/v1/users/mypage', body);

  return response?.data;
};

export const updatePassword = async (body) => {
  const response = await authAxios.patch('/v1/users/mypage/password', body);

  return response?.data;
};

export const getMyPostList = async (params = {}) => {
  const response = await authAxios.get('/v1/users/mypage/posts', {
    params,
  });

  return response?.data.result;
};

export const getMyCommentList = async (params = {}) => {
  const response = await authAxios.get('/v1/users/mypage/comments', {
    params,
  });

  return response?.data.result;
};

export const getMyReviewFileList = async (params = {}) => {
  const response = await authAxios.get('/v1/users/mypage/reviewFileList', {
    params,
  });

  return response?.data.result;
};

export const getMyScrapReviewList = async (params) => {
  const response = await authAxios.get('/v1/scraps/reviews', {
    params,
  });

  return response?.data.result;
};

export const getMyScrapPostList = async (params) => {
  const response = await authAxios.get('/v1/scraps/posts', {
    params,
  });

  return response?.data.result;
};
