import { dateStrWithDay, serverTimeStr } from '@/shared/lib';

export const MAINTENANCE_START = new Date('2025-07-17T01:00:00+09:00'); // 서버 점검 시작(년-월-일THH:MM:SS+한국기준)
export const MAINTENANCE_END = new Date('2025-07-18T19:00:00+09:00'); // 서버 점검 끝

export function useMaintenance(MAINTENANCE_START, MAINTENANCE_END) {
  const isSameDate =
    MAINTENANCE_START.toDateString() === MAINTENANCE_END.toDateString();

  const startDateStr = dateStrWithDay(MAINTENANCE_START);
  const endDateStr = dateStrWithDay(MAINTENANCE_END);
  const startTime = serverTimeStr(MAINTENANCE_START);
  const endTime = serverTimeStr(MAINTENANCE_END);

  // YYYY/MM/DD (Day) HH:MM ~ HH:MM
  return isSameDate
    ? `${startDateStr} ${startTime} - ${endTime}`
    : [`${startDateStr} ${startTime}`, <br />, `- ${endDateStr} ${endTime}`];
}
