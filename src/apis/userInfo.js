import { authAxios } from '../axios';

export const withdrawAccount = async (body) => {
  const { data } = await authAxios.delete('/v1/users/withdraw', {
    data: body,
  });

  return data;
};

export const getMyPageUserInfo = async () => {
  const { data } = await authAxios.get('/v1/users/mypage');

  return data;
};

export const updateUserInfo = async (body) => {
  const { data } = await authAxios.patch('/v1/users/mypage', body);

  return data;
};

export const updatePassword = async (body) => {
  const { data } = await authAxios.patch('/v1/users/mypage/password', body);

  return data;
};

export const getMyPostList = async (params = {}) => {
  const { data } = await authAxios.get('/v1/users/mypage/posts', {
    params,
  });

  return data.result;
};

export const getMyCommentList = async (params = {}) => {
  const { data } = await authAxios.get('/v1/users/mypage/comments', {
    params,
  });

  return data.result;
};

export const getMyReviewFileList = async (params = {}) => {
  const { data } = await authAxios.get('/v1/users/mypage/reviewFileList', {
    params,
  });

  return data.result;
};

export const getMyScrapReviewList = async (params) => {
  const { data } = await authAxios.get('/v1/scraps/reviews', {
    params,
  });

  return data.result;
};

export const getMyScrapPostList = async (params) => {
  const { data } = await authAxios.get('/v1/scraps/posts', {
    params,
  });

  return data.result;
};
