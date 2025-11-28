import { BoardKey } from '@/shared/types';

import besookt from '@/assets/images/besookt-board-page.svg';
import financeAudit from '@/assets/images/financeAudit-board-page.svg';
import firstSnow from '@/assets/images/firstSnow-board-page.svg';
import graduationPreparation from '@/assets/images/graduationPreparation-board-page.svg';
import largeSnow from '@/assets/images/largeSnow-board-page.svg';
import permanentSnow from '@/assets/images/permanentSnow-board-page.svg';
import studentCouncil from '@/assets/images/studentCouncil-board-page.svg';
import event from '@/assets/images/event-board-page.svg';

interface Board {
  key: BoardKey;
  id: number;
  name: string;
  desc?: string;
  image?: string;
}

const COMMUNITIES = [
  {
    key: 'FIRST-SNOW',
    id: 21,
    name: '첫눈온방',
    desc: '새내기 전용 커뮤니티',
    image: firstSnow,
  },
  {
    key: 'LARGE-SNOW',
    id: 22,
    name: '함박눈방',
    desc: '눈송이 모두의 커뮤니티',
    image: largeSnow,
  },
  {
    key: 'PERMANENT-SNOW',
    id: 23,
    name: '만년설방',
    desc: '졸업생 전용 커뮤니티',
    image: permanentSnow,
  },
] as const satisfies readonly Board[];

const OFFICIALS = [
  {
    key: 'STUDENT-COUNCIL',
    id: 60,
    name: '총학생회',
    desc: '총학생회 공지',
    image: studentCouncil,
  },
  {
    key: 'GRADUATION-PREPARATION',
    id: 61,
    name: '졸업준비위원회',
    desc: '졸업준비위원회 공지',
    image: graduationPreparation,
  },
  {
    key: 'FINANCE-AUDIT',
    id: 62,
    name: '재정감사위원회',
    desc: '재정감사 보고',
    image: financeAudit,
  },
] as const satisfies readonly Board[];

const OTHERS = [
  {
    key: 'NOTICE',
    id: 12,
    name: '공지사항',
  },
  {
    key: 'EVENT',
    id: 14,
    name: '이벤트',
    desc: '이벤트',
    image: event,
  },
  {
    key: 'BESOOKT',
    id: 20,
    name: '베숙트',
    desc: '추천을 가장 많이\n받은 게시물 모아보기',
    image: besookt,
  },
  {
    key: 'EXAM-REVIEW',
    id: 32,
    name: '시험후기',
  },
] as const satisfies readonly Board[];

const ALL = [
  ...COMMUNITIES,
  ...OFFICIALS,
  ...OTHERS,
] as const satisfies readonly Board[];

export const BoardRegistry = {
  communities: COMMUNITIES,
  officials: OFFICIALS,
  all: ALL,
  find(targetKey: BoardKey): Board {
    return ALL.find(({ key }) => key === targetKey);
  },
} as const;
