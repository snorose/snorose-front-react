import { authAxios } from '../axios';

const ENDPOINT = '/v1/users';

export const withdrawAccount = async (navigate) => {
  try {
    const response = await authAxios.delete(`${ENDPOINT}/withdraw`);

    if (response.status === 200) {
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/home');
    }

    return response;
  } catch (error) {
    alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    return error.response;
  }
};
