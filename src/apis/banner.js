import { authAxios } from '@/axios';

export const getBannerImage = async () => {
  const response = await authAxios.get('/v1/home/banners/view');
  return response.data.result;
};
