import { authAxios } from '@/axios';

export const verifySookmyungPortal = async ({ studentId, password, email }) => {
  const response = await authAxios.post('/v1/users/authentication/request', {
    studentId,
    password,
    email,
  });

  return response;
};
