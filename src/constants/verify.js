import { v4 as uuidv4 } from 'uuid';

export const TERMS = Object.freeze({
  text: [
    '회원님의 정보는 아래와 같이 활용됩니다.',
    '계속 진행 시 개인정보 수집 이용에 동의하는 것으로 간주합니다.',
  ],
  list: [
    { id: uuidv4(), text: '숙명인 여부 확인' },
    { id: uuidv4(), text: '학적 확인' },
  ],
});

export const TITLE_DES = Object.freeze({
  terms: {
    title: '스노로즈 이용약관',
  },
  verify: {
    title: '스노로즈 인증을 위해 \n 숙명포털 로그인 정보를 입력해주세요',
    description:
      '숙명포털 인증은 최대 약 n분 정도 소요되며 \n 인증 완료는 알림을 통해서 확인할 수 있어요 \n\n 인증에 사용되는 비밀번호는 저장되지 않아요',
  },
  complete: {
    title: '스노로즈 인증 신청이 완료되었어요!',
    description: '인증이 완료될 경우 \n 알림을 통해 확인하실 수 있어요',
  },
});
