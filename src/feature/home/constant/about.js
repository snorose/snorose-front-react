import { ROLE } from '@/shared/constant';

export const ABOUT_SNOROSE = `스노로즈는 숙명인이 직접 운영하는 숙명인만을 위한 커뮤니티입니다.

2007년 8월 15일 처음 문을 연 이후 현재까지 숙명인들의 사랑을 받으며, ‘숙명인만을 위한 캠퍼스 너머의 공간’이 되고자 각종 교내외 정보를 공유하고 서로의 일상을 진솔하게 주고받는 나눔과 소통의 장으로 꾸준히 성장해 왔습니다. 지금껏 그래왔듯 앞으로도 스노로즈는 오직 숙명인을 위해, 그리고 숙명인에 의해 투명하게 운영될 것이며, 하나된 숙명을 위해 튼튼한 다리가 될 것임을 약속합니다.

스노로즈는 모든 숙명인에게 열려 있습니다.
숙명여대 유일 커뮤니티, 스노로즈의 문을 두드려주세요.

문의메일 : snorose1906@gmail.com
카카오톡 문의 창구: (http://pf.kakao.com/_Xmhxhn)`;

export const SNOROSE_HISTORY = Object.freeze([
  { name: '스노로즈 1.0(블랙로즈)', description: '07.08.15 오픈' },
  { name: '스노로즈 2.0(블루로즈)', description: '08.01.01 오픈' },
  { name: '스노로즈 3.0(화이트로즈)', description: '09.11.01 오픈' },
  { name: '스노로즈 4.0', description: '15.11.12 오픈' },
  { name: '스노로즈 5.0', description: '18.09.08 오픈' },
  { name: '스노로즈 6.0', description: '24.10.12 오픈' },
]);

export const SNOROSE_MEMBERSHIP_LEVEL = Object.freeze([
  {
    role: ROLE.preUser,
    name: '준회원',
    description:
      '최초 가입 시 수여되는 등급으로, 숙명인 인증이 완료되지 않은 회원입니다. 일부 게시판 및 기능만 이용할 수 있습니다.',
    badge: false,
  },
  {
    role: ROLE.user,
    name: '정회원',
    description:
      '숙명인 인증을 완료한 회원입니다. 모든 게시판 및 기능을 이용할 수 있습니다.',
    badge: false,
  },
  {
    role: ROLE.admin,
    name: '리자',
    description: '스노로즈의 관리자입니다.',
    badge: true,
  },
  {
    role: ROLE.official,
    name: '공식 계정',
    description: '총학생회, 졸업준비위원회 등 교내 공식 기구 전용 등급입니다.',
    badge: true,
  },
  {
    role: ROLE.blacklist,
    name: '블랙리스트',
    description:
      '강등된 회원입니다. 강등 기간이 종료되면 준회원으로 조정됩니다.',
    badge: false,
  },
]);
