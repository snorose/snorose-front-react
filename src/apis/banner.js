import { authAxios } from '@/axios/index.js';

export const getBannerImage = async () => {
  const response = await authAxios.get('/v1/home/banners/view');
  return response.data.result;
};
