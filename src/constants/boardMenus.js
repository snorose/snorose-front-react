import firstSnow from '@/assets/images/firstSnow-board-page.svg';
import largeSnow from '@/assets/images/largeSnow-board-page.svg';
import permanentSnow from '@/assets/images/permanentSnow-board-page.svg';
import besookt from '@/assets/images/besookt-board-page.svg';

export const BOARD_MENUS = [
  {
    id: 12,
    to: '/board/notice',
    textId: 'notice',
    title: '공지사항',
    desc: '',
    image: '',
  },
  {
    id: 21,
    to: '/board/first-snow',
    textId: 'first-snow',
    title: '첫눈온방',
    desc: '새내기 전용 커뮤니티',
    image: firstSnow,
  },
  {
    id: 22,
    to: '/board/large-snow',
    textId: 'large-snow',
    title: '함박눈방',
    desc: '눈송이 모두가\n이용하는 커뮤니티',
    image: largeSnow,
  },
  {
    id: 23,
    to: '/board/permanent-snow',
    textId: 'permanent-snow',
    title: '만년설방',
    desc: '졸업생 전용 커뮤니티',
    image: permanentSnow,
  },
  // 2차 개발 시 추가 예정
  // {
  //   id: 20,
  //   to: '/board/besookt',
  //   textId: 'besookt',
  //   title: '베숙트',
  //   desc: '추천을 가장 많이\n받은 게시물 모아보기',
  //   image: besookt,
  // },
  {
    id: 32,
    to: '/board/exam-review',
    textId: 'exam-review',
    title: '시험후기',
    desc: '시험 정보를 조회할 수\n있는 게시판입니다.',
    image: besookt,
  },
  {
    id: 32,
    to: '/board/exam-review-notice',
    textId: 'exam-review-notice',
    title: '시험후기',
    desc: '시험후기 공지글 게시판',
    image: besookt,
  },
];
