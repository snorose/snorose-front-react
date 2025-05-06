export const NAVBAR_MENUS = Object.freeze([
  {
    id: 'home',
    to: '/home',
    label: '메인홈',
    width: 28,
    height: 28,
  },
  {
    id: 'board',
    to: '/board',
    label: '게시판',
    width: 28,
    height: 28,
  },
  {
    id: 'test',
    to: '/board/exam-review',
    label: '시험후기',
    width: 28,
    height: 28,
  },
  // {
  //   id: 'bell',
  //   to: '/alert',
  //   label: '알림',
  //   width: 28,
  //   height: 28,
  // },
  {
    id: 'mypage',
    to: '/my-page',
    label: '마이페이지',
    width: 28,
    height: 28,
  },
]);

export const SIDEBAR_MENUS = Object.freeze([
  {
    to: '/',
    title: '스노로즈',
    items: [
      { to: '/about', name: 'About 스노로즈' },
      { to: '/board/notice', name: '공지사항' },
      {
        to: 'https://snorose.notion.site/1a37ef0aa3bf8071bcd0cb35c035636e?pvs=4',
        name: '스노로즈 블로그',
      },
    ],
  },
  {
    to: '/verify',
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
    to: '/board',
    title: '공식 게시판',
    items: [
      { to: '/board/student-council', name: '총학생회' },
      { to: '/board/graduation-preparation', name: '졸업준비위원회' },
      { to: '/board/finance-audit', name: '재정감사위원회' },
    ],
  },
  {
    to: '/board/exam-review',
    title: '시험후기',
  },
  // {
  //   to: '/help',
  //   title: '문의/신고',
  // },
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
  '스노로즈',
  '문의/신고',
  '숙명여대',
]);
