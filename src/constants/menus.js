export const NAVBAR_MENUS = Object.freeze([
  {
    id: 'home',
    label: '메인홈',
    fill: '#BFD7EC',
    width: 24,
    height: 24,
  },
  {
    id: 'board',
    label: '게시판',
    fill: '#BFD7EC',
    width: 24,
    height: 24,
  },
  {
    id: 'exam-review',
    label: '시험후기',
    fill: '#BFD7EC',
    width: 24,
    height: 24,
  },
  {
    id: 'alert',
    label: '알림',
    fill: '#BFD7EC',
    width: 24,
    height: 24,
  },
  {
    id: 'my-page',
    label: '마이페이지',
    fill: '#BFD7EC',
    width: 24,
    height: 24,
  },
]);

export const SIDEBAR_MENUS = Object.freeze([
  {
    to: '/',
    title: 'SNOROSE',
    items: [
      { to: '/about', name: 'About 스노로즈' },
      { to: '/notice', name: '공지사항' },
    ],
  },
  {
    to: '/authentication',
    title: '인증',
  },
  {
    to: '/board',
    title: '커뮤니티',
    items: [
      { to: '/board/first-snow', name: '첫눈온방' },
      { to: '/board/large-snow', name: '함박눈방' },
      { to: '/board/permanent-snow', name: '만년설방' },
      { to: '/board/besookt', name: '베숙트' },
    ],
  },
  {
    to: '/exam-review',
    title: '시험후기',
  },
  {
    to: '/help',
    title: '문의/신고',
  },
  {
    to: '/',
    title: '숙명여대',
    items: [
      {
        to: 'https://www.sookmyung.ac.kr/kr/index.do',
        name: '숙명여대 홈페이지',
      },
      { to: 'https://portal.sookmyung.ac.kr/irj/portal', name: '숙명포털' },
      { to: 'https://snowe.sookmyung.ac.kr/bbs5/index', name: '스노위' },
    ],
  },
]);

export const NOT_LOGIN_MENUS = Object.freeze([
  'SNOROSE',
  '문의/신고',
  '숙명여대',
]);
