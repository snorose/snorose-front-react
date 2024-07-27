import firstSnow from '../assets/images/firstSnow-board-page.svg';
import largeSnow from '../assets/images/largeSnow-board-page.svg';
import permanentSnow from '../assets/images/permanentSnow-board-page.svg';
import besookt from '../assets/images/besookt-board-page.svg';

export const BOARD_MENUS = [
  {
    id: 'firstSnow',
    to: '/board/first-snow',
    title: '첫눈온방',
    desc: '새내기 전용 커뮤니티',
    image: firstSnow,
  },
  {
    id: 'largeSnow',
    to: '/board/large-snow',
    title: '함박눈방',
    desc: '눈송이 모두가\n이용하는 커뮤니티',
    image: largeSnow,
  },
  {
    id: 'permanentSnow',
    to: '/board/permanent-snow',
    title: '만년설방',
    desc: '졸업생 전용 게시판',
    image: permanentSnow,
  },
  {
    id: 'besookt',
    to: '/board/besookt',
    title: '베숙트',
    desc: '추천을 가장 많이\n받은 게시물 모아보기',
    image: besookt,
  },
];
