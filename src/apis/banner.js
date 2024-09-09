import { defaultAxios } from '@/axios';

export const getBannerImage = async () => {
  const response = await defaultAxios.get('/v1/home/banners/view');
  return response?.data.result;
};
